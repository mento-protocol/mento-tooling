### MGP04: Voting Period Adjustment for Alfajores L2 Transition

#### Description

With Alfajores testnet's transition to L2, the block time has been reduced from 5 seconds to 1 second. This proposal adjusts the governance voting period to maintain a consistent one-week duration under the new block time.

#### Changes

1. Adjust voting period to maintain one week duration on Alfajores:
   - Update from current block count to account for 1-second blocks
   - Ensures voting period remains approximately one week in duration

#### Motivation

- Preserve the one week voting period duration after Alfajores' L2 transition
- Maintain consistent governance timeframes despite block time changes
- Ensure governance processes remain predictable and user-friendly

#### Technical Rationale

- Alfajores block time has changed from 5s to 1s
- Voting period block count must be adjusted to maintain the same real-world duration
- New block count calculation: (7 days _ 24 hours _ 60 minutes \* 60 seconds) = 604,800 blocks

#### Security Considerations

- No direct security implications
- Maintains existing governance timing expectations
- Only affects Alfajores testnet, serving as a test case for future mainnet transition

#### Implementation Details

- Single transaction to update voting period in MentoGovernor contract
- Only applies to Alfajores testnet
- Mainnet adjustment will be handled in a future proposal when L2 transition occurs

#### Testing

- Validate voting period duration matches one week with new block time
- Confirm proposal creation and voting work as expected
- Test complete governance cycle with new timing

#### Future Outlook

- Similar adjustment will be needed for mainnet when L2 transition occurs
- Serves as validation for future mainnet voting period adjustment
