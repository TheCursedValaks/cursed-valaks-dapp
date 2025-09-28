use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use anchor_spl::token::Mint;

declare_id!("REPLACE_PROGRAM_ID");

#[program]
pub mod cursed_valaks_vault {
    use super::*;

    // Initialize per-user vault (stores user pubkey, bump, and mint)
    pub fn initialize_vault(ctx: Context<InitializeVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.user = ctx.accounts.user.key();
        vault.bump = *ctx.bumps.get("vault").unwrap();
        vault.mint = ctx.accounts.mint.key();
        Ok(())
    }

    // Withdraw amount of tokens from vault_ata => user_ata
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let vault = &ctx.accounts.vault;

        // seeds used to sign as the PDA (vault)
        let seeds = &[
            b"vault",
            vault.user.as_ref(),
            &[vault.bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_ata.to_account_info(),
            to: ctx.accounts.user_ata.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();

        // Perform transfer with vault PDA as signer
        token::transfer(
            CpiContext::new_with_signer(cpi_program, cpi_accounts, signer),
            amount,
        )?;

        Ok(())
    }
}

#[account]
pub struct Vault {
    // 32 bytes
    pub user: Pubkey,
    // 1 byte
    pub bump: u8,
    // 32 bytes
    pub mint: Pubkey,
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: The mint being used for rewards
    pub mint: Account<'info, Mint>,

    #[account(
        init,
        payer = user,
        space = 8 + 32 + 1 + 32,
        seeds = [b"vault", user.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        seeds = [b"vault", vault.user.as_ref()],
        bump = vault.bump,
        has_one = user
    )]
    pub vault: Account<'info, Vault>,

    /// Vault's token account (associated token account owned by vault PDA)
    #[account(mut, token::mint = vault.mint, token::authority = vault)]
    pub vault_ata: Account<'info, TokenAccount>,

    /// User's token account (to receive tokens)
    #[account(mut, token::mint = vault.mint)]
    pub user_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}
