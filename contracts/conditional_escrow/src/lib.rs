#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, Symbol};

#[contract]
pub struct ConditionalEscrowContract;

#[contractimpl]
impl ConditionalEscrowContract {
    pub fn init(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&Symbol::new(&env, "admin"), &admin);
    }

    pub fn is_initialized(env: Env) -> bool {
        env.storage().instance().has(&Symbol::new(&env, "admin"))
    }
}
