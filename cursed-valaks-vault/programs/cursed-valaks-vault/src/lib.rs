use anchor_lang::prelude::*;

declare_id!("HZRbgxuHRSLFRn8JbbjBeKt6yxHsTHQQ83DarAY1puqu");

#[program]
pub mod cursed_valaks_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
