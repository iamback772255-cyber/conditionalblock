import { Router } from 'express';
import { rpc } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

/**
 * GET /api/transactions
 * Get all transactions for the authenticated user's contracts.
 */
router.get('/', async (req, res) => {
  try {
    const { type, page = 1, limit = 30 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Fetch user contracts to get their IDs (since get_user_transactions RPC might be missing or broken)
    const contracts = await rpc('get_user_contracts', {
      user_key: req.user.publicKey,
      status_filter: null,
      lim: 1000,
      off: 0,
    });
    
    const contractIds = contracts.map(c => c.id);
    
    if (contractIds.length === 0) {
      return res.json({ transactions: [] });
    }
    
    const { supabase } = await import('../db/database.js');
    let query = supabase
      .from('transactions')
      .select('*, contracts!inner(title)')
      .in('contract_id', contractIds);
      
    if (type) {
      query = query.eq('type', type);
    }
    
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);
      
    const { data, error } = await query;
    if (error) throw error;
    
    const transactions = data.map(t => ({
      ...t,
      contract_title: t.contracts?.title
    }));

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load transactions: ' + err.message });
  }
});

/**
 * GET /api/transactions/contract/:contractId
 * Get transactions for a specific contract.
 */
router.get('/contract/:contractId', async (req, res) => {
  try {
    const { findAll } = await import('../db/database.js');
    const transactions = await findAll('transactions', { contract_id: req.params.contractId }, {
      orderBy: 'created_at',
      ascending: false,
    });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load transactions: ' + err.message });
  }
});

export default router;

// Optimized for performance and readability
