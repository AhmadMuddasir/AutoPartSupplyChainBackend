"use client";

import React, { useState } from "react";
import { useContract } from "@/context/ContractContext";
import { autoPartApi } from "@/lib/api";
import toast from "react-hot-toast";

const MintPartButton = ({ partId, tokenId, onSuccess }) => {
  const [isMinting, setIsMinting] = useState(false);
  const { state } = useContract();

  const handleMint = async () => {
    if (!state.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!partId) {
      toast.error("Part ID is missing");
      return;
    }

    setIsMinting(true);
    const toastId = toast.loading("Minting part...");

    try {

      const retailerAddress = prompt("Enter retailer wallet address:");
      if (!retailerAddress) {
        toast.error("Retailer address required", { id: toastId });
        return;
      }

      const result = await autoPartApi.mint(partId, retailerAddress);

      toast.success(
        `Part minted! Token ID: ${result.data.tokenId}`,
        { id: toastId }
      );

      onSuccess?.();
    } catch (error) {
      console.error("❌ Mint error:", error);
      toast.error(
        error.response?.data?.message || "Failed to mint part",
        { id: toastId }
      );
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={isMinting || !!tokenId}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        tokenId
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-[#8FA88A] text-[#1C2620] hover:bg-[#7A9776]"
      }`}
    >
      {tokenId ? `Minted (ID: ${tokenId})` : isMinting ? "Minting..." : "Mint to Retailer"}
    </button>
  );
};

export default MintPartButton;