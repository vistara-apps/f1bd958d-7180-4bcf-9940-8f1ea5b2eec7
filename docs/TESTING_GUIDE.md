# x402 Payment Flow Testing Guide

## Pre-requisites

1. **Wallet Setup**
   - Install Coinbase Wallet browser extension
   - Have a wallet with some ETH on Base for gas fees
   - Have USDC on Base for testing payments

2. **Getting Test USDC on Base**
   - Bridge ETH to Base: https://bridge.base.org
   - Swap ETH for USDC on Base using Uniswap or other DEX
   - Alternatively, use Base testnet for initial testing

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   Add your OnchainKit API key to `.env.local`

## Test Plan

### 1. Wallet Connection Test

**Objective**: Verify wallet connection works correctly

**Steps**:
1. Start the development server: `npm run dev`
2. Open http://localhost:3000 in your browser
3. Click "Connect Wallet" button
4. Approve connection in Coinbase Wallet
5. Verify your address appears in the header

**Expected Results**:
- ✅ Wallet connects successfully
- ✅ Address displays in wallet dropdown
- ✅ Avatar and Name load from OnchainKit
- ✅ Can copy address by clicking

### 2. Balance Check Test

**Objective**: Verify USDC balance displays correctly

**Steps**:
1. Connect wallet (see Test 1)
2. Scroll to "x402 Payment Demo" section
3. Observe the balance display

**Expected Results**:
- ✅ Balance shows correct USDC amount
- ✅ Balance formatted with 2 decimals
- ✅ Shows "0.00 USDC" if no balance
- ✅ Updates when wallet changes

### 3. Direct Payment Test

**Objective**: Execute a USDC payment and verify confirmation

**Steps**:
1. Connect wallet with USDC balance
2. In Payment Demo section:
   - Enter amount: `1.00`
   - Enter recipient: (use a test address or your own)
3. Click "Send Payment"
4. Approve transaction in wallet
5. Wait for confirmation

**Expected Results**:
- ✅ Payment button shows "Processing..." during transaction
- ✅ Success message appears with transaction hash
- ✅ Transaction hash links to Basescan
- ✅ Balance updates after payment
- ✅ Can click transaction link to view on explorer

**Verification**:
```bash
# Check transaction on Basescan
https://basescan.org/tx/[transaction-hash]
```

### 4. Input Validation Test

**Objective**: Verify payment form validates inputs correctly

**Test Cases**:

a) **Invalid Amount**
   - Enter: `-1.00`
   - Expected: Button disabled or error shown

b) **Zero Amount**
   - Enter: `0.00`
   - Expected: Button disabled or error shown

c) **Invalid Address**
   - Enter: `invalid-address`
   - Expected: Error message about invalid address

d) **Empty Address**
   - Enter: (leave empty)
   - Expected: Send button disabled

e) **Valid Inputs**
   - Amount: `1.50`
   - Address: `0x...` (valid address)
   - Expected: Send button enabled

### 5. Error Handling Test

**Objective**: Verify error states display correctly

**Test Cases**:

a) **Insufficient Balance**
   - Enter amount greater than balance
   - Attempt payment
   - Expected: Error message about insufficient balance

b) **User Rejection**
   - Start payment
   - Reject in wallet
   - Expected: Error message about user rejection

c) **Network Error**
   - Disconnect internet
   - Attempt payment
   - Expected: Network error message

d) **Dismiss Error**
   - Trigger any error
   - Click dismiss button
   - Expected: Error message clears

### 6. x402 Client Creation Test

**Objective**: Verify x402 API client can be created

**Steps**:
1. Connect wallet
2. In "x402 API Client" section:
   - Enter API URL: `https://api.example.com`
3. Click "Create x402 Client"
4. Open browser console
5. Check for success message

**Expected Results**:
- ✅ Success message in console
- ✅ No errors in console
- ✅ Client creation doesn't fail

### 7. Transaction Confirmation Test

**Objective**: Verify transaction waits for confirmation

**Steps**:
1. Execute a payment (Test 3)
2. Observe loading states
3. Wait for confirmation
4. Verify final state

**Expected Results**:
- ✅ Shows "Processing..." during pending
- ✅ Waits for at least 1 confirmation
- ✅ Shows success only after confirmation
- ✅ Transaction hash appears in success message

### 8. Balance Refresh Test

**Objective**: Verify balance updates after transaction

**Setup**:
1. Note current balance
2. Execute a payment
3. Wait for confirmation

**Expected Results**:
- ✅ Balance decreases by payment amount
- ✅ Balance accounts for gas fees
- ✅ Balance updates automatically
- ✅ New balance is accurate

### 9. Multiple Payment Test

**Objective**: Verify multiple payments work in sequence

**Steps**:
1. Execute first payment
2. Wait for confirmation
3. Execute second payment
4. Wait for confirmation

**Expected Results**:
- ✅ Both payments succeed
- ✅ Each shows unique transaction hash
- ✅ Balance updates after each payment
- ✅ No state conflicts between payments

### 10. Wallet Disconnect Test

**Objective**: Verify graceful handling when wallet disconnects

**Steps**:
1. Connect wallet
2. Note balance displays
3. Disconnect wallet via dropdown
4. Observe UI updates

**Expected Results**:
- ✅ Balance clears when disconnected
- ✅ "Connect Wallet" button reappears
- ✅ Payment form disabled when disconnected
- ✅ Error message if payment attempted while disconnected

## End-to-End Test Scenario

**Complete User Flow**:

1. **Setup** (2 mins)
   - Open application
   - Connect Coinbase Wallet
   - Verify balance displays

2. **First Payment** (3 mins)
   - Enter amount: $5.00 USDC
   - Enter recipient address
   - Execute payment
   - Approve in wallet
   - Wait for confirmation
   - Verify on Basescan

3. **Second Payment** (3 mins)
   - Use different amount
   - Use different recipient
   - Execute payment
   - Verify balance updated correctly

4. **Error Recovery** (2 mins)
   - Attempt payment with invalid data
   - Verify error handling
   - Correct data and retry
   - Verify success

5. **Cleanup** (1 min)
   - Disconnect wallet
   - Verify UI returns to initial state

**Total Time**: ~11 minutes

## Test Results Log

Use this template to log test results:

```
Date: _______________
Tester: _______________

Test 1 - Wallet Connection: ☐ Pass ☐ Fail
Notes: _______________________________

Test 2 - Balance Check: ☐ Pass ☐ Fail
Notes: _______________________________

Test 3 - Direct Payment: ☐ Pass ☐ Fail
Transaction Hash: _______________________________
Notes: _______________________________

Test 4 - Input Validation: ☐ Pass ☐ Fail
Notes: _______________________________

Test 5 - Error Handling: ☐ Pass ☐ Fail
Notes: _______________________________

Test 6 - x402 Client Creation: ☐ Pass ☐ Fail
Notes: _______________________________

Test 7 - Transaction Confirmation: ☐ Pass ☐ Fail
Notes: _______________________________

Test 8 - Balance Refresh: ☐ Pass ☐ Fail
Notes: _______________________________

Test 9 - Multiple Payments: ☐ Pass ☐ Fail
Notes: _______________________________

Test 10 - Wallet Disconnect: ☐ Pass ☐ Fail
Notes: _______________________________

Overall Assessment: ☐ Ready for Production ☐ Needs Fixes
```

## Automated Testing (Future)

Consider adding these automated tests:

```typescript
// Example test structure
describe('x402 Payment Flow', () => {
  it('should connect wallet successfully', async () => {
    // Test wallet connection
  });

  it('should display USDC balance', async () => {
    // Test balance display
  });

  it('should execute payment', async () => {
    // Test payment execution
  });

  it('should handle errors gracefully', async () => {
    // Test error handling
  });
});
```

## Performance Benchmarks

Expected performance metrics:

- **Wallet Connection**: < 2 seconds
- **Balance Check**: < 1 second
- **Transaction Submission**: < 5 seconds
- **Transaction Confirmation**: 2-10 seconds (depends on network)
- **UI Updates**: Instant (< 100ms)

## Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Chrome (iOS/Android)
- ✅ Mobile Safari (iOS)

## Known Limitations

1. **Mainnet Only**: Currently configured for Base mainnet
2. **USDC Only**: Only supports USDC payments
3. **Single Chain**: Only supports Base chain
4. **Wallet Support**: Optimized for Coinbase Smart Wallet

## Troubleshooting

If tests fail, check:
1. Wallet has sufficient ETH for gas
2. Wallet has USDC on Base
3. OnchainKit API key is valid
4. Network connectivity is stable
5. Browser allows wallet connection
6. Console for detailed error messages
