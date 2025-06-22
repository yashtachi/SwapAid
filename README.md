
# 🌍 SwapAid – Decentralized Aid Distribution on Solana

SwapAid is a decentralized application (dApp) built on the **Solana blockchain** leveraging the **Jup.ag (Jupverse)** token routing protocol. It enables secure, transparent, and efficient **distribution of aid funds** to verified recipients via stablecoins like USDC.

---

## 🚀 Project Goal

To provide NGOs, charities, and DAOs a powerful tool to:
- Accept donations in any Solana-based token
- Swap tokens to stablecoins (USDC) using Jup.ag
- Bulk-distribute funds to beneficiaries
- Ensure real-time, transparent tracking of aid

---

## 🧩 Key Features

- 🔗 **Decentralized Token Swapping**  
  Automatically converts any SPL token (SOL, BONK, etc.) to USDC via Jup.ag.

- 📤 **Bulk Token Distribution**  
  Distribute USDC to multiple recipient wallets using Solana's SPL Token Program.

- 👛 **Wallet Integration**  
  Secure login with Phantom, Solflare, and other Solana wallets.

- 📊 **Aid Distribution Dashboard**  
  View total aid sent, number of recipients, timestamps, and transaction links.

- 🔐 **Optional KYC for NGOs**  
  Add verified wallet management using Firebase or Supabase.

---

## 🛠️ Tech Stack

| Layer        | Tools / Libraries                      |
|--------------|----------------------------------------|
| Blockchain   | Solana, SPL Token Program              |
| Token Swaps  | Jup.ag Swap API                        |
| Frontend     | React.js, Tailwind CSS                 |
| Wallets      | Solana Wallet Adapter (Phantom, etc.)  |
| Backend (opt)| Firebase / Supabase                    |
| Data Fetch   | Helius / Solana RPC                    |

---

## ⚙️ How It Works

1. **Donor connects wallet** and sends any token (e.g., SOL, BONK).
2. **Jup.ag API swaps** the token to USDC at best available route.
3. **USDC is distributed** to a list of verified wallets (recipients).
4. **Dashboard shows** amount, recipients, timestamps, and Solscan links.

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/swap-aid.git
cd swap-aid
