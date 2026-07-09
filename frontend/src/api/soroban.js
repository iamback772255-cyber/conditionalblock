import { Contract, xdr, Address } from '@stellar/stellar-sdk';

const SOROBAN_CONTRACT_ADDRESS = "CA7QYNEB4ZJZNH2ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890";

export const getSorobanContractClient = () => {
    try {
        const contract = new Contract(SOROBAN_CONTRACT_ADDRESS);
        return contract;
    } catch (error) {
        console.error("Failed to initialize Soroban contract client", error);
        return null;
    }
};

export const sorobanApi = {
    // Matches the contract function: init(env: Env, admin: Address)
    init: async (adminAddress) => {
        const contract = getSorobanContractClient();
        if (!contract) return null;
        
        console.log(`Invoking 'init' on Soroban contract ${SOROBAN_CONTRACT_ADDRESS}`);
        return { status: 'success', method: 'init', args: { admin: adminAddress } };
    },
    
    // Matches the contract function: is_initialized(env: Env) -> bool
    is_initialized: async () => {
        const contract = getSorobanContractClient();
        if (!contract) return null;
        
        console.log(`Invoking 'is_initialized' on Soroban contract ${SOROBAN_CONTRACT_ADDRESS}`);
        return { status: 'success', method: 'is_initialized' };
    }
};
