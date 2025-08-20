
import { createAppKit } from "https://esm.sh/@reown/appkit";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

// Configuración de Reown AppKit
const appKit = createAppKit({
  projectId: "c417e04bf02de050bec4b0ffaf5ff60d",
  metadata: {
    name: "FlappyMon",
    description: "Juego Web3 en Monad Testnet",
    url: window.location.origin,
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
  }
});

let provider;
let signer;
let userAddress;

// Dirección del contrato NFT
const nftAddress = "0x11ddb63052d2Ad69D15c7879890104eCCccff3BE";
const nftAbi = [
  "function mint() public",
  "function balanceOf(address owner) view returns (uint256)"
];

// Conectar Wallet
async function connectWallet() {
  try {
    provider = new ethers.providers.Web3Provider(appKit.getWalletProvider());
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    document.getElementById("status").innerText = "Wallet conectada: " + userAddress;
    checkNFT();
  } catch (err) {
    console.error("Error al conectar wallet:", err);
  }
}

// Verificar si ya tiene NFT
async function checkNFT() {
  const contract = new ethers.Contract(nftAddress, nftAbi, provider);
  const balance = await contract.balanceOf(userAddress);
  if (balance.toNumber() > 0) {
    document.getElementById("mintBtn").style.display = "none";
    document.getElementById("playBtn").disabled = false;
    document.getElementById("status").innerText = "NFT detectado ✅";
  } else {
    document.getElementById("mintBtn").style.display = "inline-block";
  }
}

// Mintear NFT
async function mintNFT() {
  try {
    const contract = new ethers.Contract(nftAddress, nftAbi, signer);
    const tx = await contract.mint();
    await tx.wait();
    alert("NFT minteado con éxito ✅");
    checkNFT();
  } catch (err) {
    console.error("Error en mint:", err);
    alert("Error al mintear NFT ❌");
  }
}

// Eventos
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectBtn").addEventListener("click", connectWallet);
  document.getElementById("mintBtn").addEventListener("click", mintNFT);
});
