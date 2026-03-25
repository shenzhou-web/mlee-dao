/**
 * MDAOPresale Contract ABI
 * Source: Remix IDE — generated from actual deployed contract
 * DO NOT manually edit this file
 */

// export const MDAO_PRESALE_ABI = [
//   {
//     inputs: [
//       { internalType: "address", name: "_saleToken", type: "address" },
//       { internalType: "address", name: "_paymentToken", type: "address" },
//       { internalType: "uint256", name: "_phase1Price", type: "uint256" },
//       { internalType: "uint256", name: "_phase2Price", type: "uint256" },
//       { internalType: "uint256", name: "_phase3Price", type: "uint256" },
//       { internalType: "uint256", name: "_hardCapTokens", type: "uint256" },
//       { internalType: "uint256", name: "_minPaymentAmount", type: "uint256" },
//       { internalType: "uint256", name: "_maxTokenAllocation", type: "uint256" },
//       { internalType: "uint256", name: "_presaleStartTime", type: "uint256" },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   { inputs: [], name: "AboveMaxPurchase", type: "error" },
//   { inputs: [], name: "BelowMinPurchase", type: "error" },
//   { inputs: [], name: "CallerNotPartnershipContract", type: "error" },
//   { inputs: [], name: "EnforcedPause", type: "error" },
//   { inputs: [], name: "ExpectedPause", type: "error" },
//   { inputs: [], name: "HardCapReached", type: "error" },
//   { inputs: [], name: "InsufficientContractBalance", type: "error" },
//   { inputs: [], name: "InvalidAddress", type: "error" },
//   { inputs: [], name: "InvalidAmount", type: "error" },
//   { inputs: [], name: "InvalidPrice", type: "error" },
//   { inputs: [], name: "NoTokensToClaim", type: "error" },
//   {
//     inputs: [{ internalType: "address", name: "owner", type: "address" }],
//     name: "OwnableInvalidOwner",
//     type: "error",
//   },
//   {
//     inputs: [{ internalType: "address", name: "account", type: "address" }],
//     name: "OwnableUnauthorizedAccount",
//     type: "error",
//   },
//   { inputs: [], name: "PresaleNotActive", type: "error" },
//   { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
//   {
//     inputs: [{ internalType: "address", name: "token", type: "address" }],
//     name: "SafeERC20FailedOperation",
//     type: "error",
//   },
//   { inputs: [], name: "VestingNotStarted", type: "error" },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "token",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "EmergencyWithdraw",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "previousOwner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "OwnershipTransferred",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "_contract",
//         type: "address",
//       },
//     ],
//     name: "PartnershipContractSet",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//     ],
//     name: "Paused",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "timestamp",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "totalSold",
//         type: "uint256",
//       },
//     ],
//     name: "PresaleEndedEarly",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "partner",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "timestamp",
//         type: "uint256",
//       },
//     ],
//     name: "RewardAllocated",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "claimer",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amountClaimed",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "timestamp",
//         type: "uint256",
//       },
//     ],
//     name: "TokensClaimed",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "buyer",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amountPaid",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "tokensAllocated",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "phase",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "priceUsed",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "timestamp",
//         type: "uint256",
//       },
//     ],
//     name: "TokensPurchased",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//     ],
//     name: "Unpaused",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "MONTHLY_PERCENTAGE",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "PHASE_DURATION",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "PRESALE_DURATION",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "TGE_PERCENTAGE",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "VESTING_DELAY",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "VESTING_INTERVAL",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "partner", type: "address" },
//       { internalType: "uint256", name: "amount", type: "uint256" },
//     ],
//     name: "allocateReward",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address[]", name: "users", type: "address[]" }],
//     name: "batchClaim",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "paymentAmount", type: "uint256" },
//     ],
//     name: "buyTokens",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     name: "buyers",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "claimTokens",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "token", type: "address" }],
//     name: "emergencyWithdraw",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "endPresale",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "startIndex", type: "uint256" },
//       { internalType: "uint256", name: "count", type: "uint256" },
//     ],
//     name: "getBuyers",
//     outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "user", type: "address" }],
//     name: "getClaimableAmount",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getCurrentPhase",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getCurrentPrice",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getPresaleEndTime",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getPresaleStats",
//     outputs: [
//       { internalType: "uint256", name: "_totalSold", type: "uint256" },
//       { internalType: "uint256", name: "_totalClaimed", type: "uint256" },
//       { internalType: "uint256", name: "_remainingTokens", type: "uint256" },
//       { internalType: "uint256", name: "_totalBuyers", type: "uint256" },
//       { internalType: "uint256", name: "_totalRaised", type: "uint256" },
//       { internalType: "bool", name: "_isActive", type: "bool" },
//       { internalType: "bool", name: "_hasEnded", type: "bool" },
//       { internalType: "uint256", name: "_currentPhase", type: "uint256" },
//       { internalType: "uint256", name: "_currentPrice", type: "uint256" },
//       { internalType: "uint256", name: "_presaleEndTime", type: "uint256" },
//       { internalType: "uint256", name: "_vestingStartTime", type: "uint256" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getTimeRemaining",
//     outputs: [
//       { internalType: "uint256", name: "secondsLeft", type: "uint256" },
//       { internalType: "uint256", name: "daysLeft", type: "uint256" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "user", type: "address" }],
//     name: "getUserInfo",
//     outputs: [
//       { internalType: "uint256", name: "totalAllocated", type: "uint256" },
//       { internalType: "uint256", name: "userTotalClaimed", type: "uint256" },
//       { internalType: "uint256", name: "claimableNow", type: "uint256" },
//       { internalType: "uint256", name: "remainingLocked", type: "uint256" },
//       { internalType: "uint256", name: "lastClaim", type: "uint256" },
//       { internalType: "uint256", name: "nextUnlockTime", type: "uint256" },
//       { internalType: "uint256", name: "nextUnlockAmount", type: "uint256" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getVestingStartTime",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "hardCap",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "isPresaleActive",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "maxTokenAllocation",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "minPaymentAmount",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "partnershipContract",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "pause",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "paused",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "paymentToken",
//     outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "phase1Price",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "phase2Price",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "phase3Price",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "presaleEndTime",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "presaleStartTime",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "", type: "address" }],
//     name: "purchases",
//     outputs: [
//       { internalType: "uint256", name: "totalAmount", type: "uint256" },
//       { internalType: "uint256", name: "claimedAmount", type: "uint256" },
//       { internalType: "uint256", name: "lastClaimTime", type: "uint256" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "renounceOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "saleToken",
//     outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "saleTokenDecimals",
//     outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "_contract", type: "address" }],
//     name: "setPartnershipContract",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "totalClaimed",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "totalSold",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
//     name: "transferOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "unpause",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "verifyTokenBalance",
//     outputs: [
//       { internalType: "bool", name: "sufficient", type: "bool" },
//       { internalType: "uint256", name: "required", type: "uint256" },
//       { internalType: "uint256", name: "actual", type: "uint256" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
//     name: "withdrawPayments",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "withdrawUnsoldTokens",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

export const MDAO_PRESALE_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_saleToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_paymentToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_phase1Price",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_phase2Price",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_phase3Price",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_hardCapTokens",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minPaymentAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_maxTokenAllocation",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_presaleStartTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    name: "AboveMaxPurchase",
    type: "error",
    inputs: [],
  },
  {
    name: "BelowMinPurchase",
    type: "error",
    inputs: [],
  },
  {
    name: "CallerNotPartnershipContract",
    type: "error",
    inputs: [],
  },
  {
    name: "EnforcedPause",
    type: "error",
    inputs: [],
  },
  {
    name: "ExpectedPause",
    type: "error",
    inputs: [],
  },
  {
    name: "HardCapReached",
    type: "error",
    inputs: [],
  },
  {
    name: "InsufficientContractBalance",
    type: "error",
    inputs: [],
  },
  {
    name: "InvalidAddress",
    type: "error",
    inputs: [],
  },
  {
    name: "InvalidAmount",
    type: "error",
    inputs: [],
  },
  {
    name: "InvalidPrice",
    type: "error",
    inputs: [],
  },
  {
    name: "NoTokensToClaim",
    type: "error",
    inputs: [],
  },
  {
    name: "OwnableInvalidOwner",
    type: "error",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "OwnableUnauthorizedAccount",
    type: "error",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "PresaleNotActive",
    type: "error",
    inputs: [],
  },
  {
    name: "ReentrancyGuardReentrantCall",
    type: "error",
    inputs: [],
  },
  {
    name: "SafeERC20FailedOperation",
    type: "error",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "VestingNotStarted",
    type: "error",
    inputs: [],
  },
  {
    name: "EmergencyWithdraw",
    type: "event",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "OwnershipTransferred",
    type: "event",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "PartnershipContractSet",
    type: "event",
    inputs: [
      {
        name: "_contract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Paused",
    type: "event",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "PresaleEndedEarly",
    type: "event",
    inputs: [
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "totalSold",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "RewardAllocated",
    type: "event",
    inputs: [
      {
        name: "partner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "TokensClaimed",
    type: "event",
    inputs: [
      {
        name: "claimer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amountClaimed",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "TokensPurchased",
    type: "event",
    inputs: [
      {
        name: "buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amountPaid",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokensAllocated",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "phase",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "priceUsed",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "Unpaused",
    type: "event",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "MONTHLY_PERCENTAGE",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "PHASE_DURATION",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "PRESALE_DURATION",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "TGE_PERCENTAGE",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "VESTING_DELAY",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "VESTING_INTERVAL",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "allocateReward",
    type: "function",
    inputs: [
      {
        name: "partner",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "batchClaim",
    type: "function",
    inputs: [
      {
        name: "users",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "buyTokens",
    type: "function",
    inputs: [
      {
        name: "paymentAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "buyers",
    type: "function",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "claimTokens",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "emergencyWithdraw",
    type: "function",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "endPresale",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "getBuyers",
    type: "function",
    inputs: [
      {
        name: "startIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "count",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getClaimableAmount",
    type: "function",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getCurrentPhase",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getCurrentPrice",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getPresaleEndTime",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getPresaleStats",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "_totalSold",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalClaimed",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_remainingTokens",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalBuyers",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalRaised",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_isActive",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_hasEnded",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_currentPhase",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_currentPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_presaleEndTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_vestingStartTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getTimeRemaining",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "secondsLeft",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "daysLeft",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getUserInfo",
    type: "function",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "totalAllocated",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "userTotalClaimed",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "claimableNow",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "remainingLocked",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "lastClaim",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "nextUnlockTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "nextUnlockAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getVestingStartTime",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "hardCap",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "isPresaleActive",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "maxTokenAllocation",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "minPaymentAmount",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "owner",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "partnershipContract",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "pause",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "paused",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "paymentToken",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "phase1Price",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "phase2Price",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "phase3Price",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "presaleEndTime",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "presaleStartTime",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "purchases",
    type: "function",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "totalAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "claimedAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "lastClaimTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "renounceOwnership",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "saleToken",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "saleTokenDecimals",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "setPartnershipContract",
    type: "function",
    inputs: [
      {
        name: "_contract",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "totalClaimed",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "totalSold",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "transferOwnership",
    type: "function",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "unpause",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "verifyTokenBalance",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "sufficient",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "required",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "actual",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "withdrawPayments",
    type: "function",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "withdrawUnsoldTokens",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
