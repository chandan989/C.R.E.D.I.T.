import React, { useState, useCallback } from 'react';

interface ContractHashProps {
  hash: string;
  truncate?: boolean;
}

const ContractHash: React.FC<ContractHashProps> = ({ hash, truncate = true }) => {
  const [copied, setCopied] = useState(false);
  const display = truncate ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : hash;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [hash]);

  return (
    <span className="contract-hash" onClick={handleCopy} title="Click to copy">
      {copied ? 'Copied ✓' : display}
    </span>
  );
};

export default ContractHash;
