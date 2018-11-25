## Meta Approve

Similar to ERC20 `approve` but relies on valiated signature instead of `msg.sender`. Allows for gas subsidized token transfers as the token sender only needs sign off chain; relaying the transaction, and paying gas, can be done by another EOA or a Smart Contract.

Note: Paying for gas in tokens is not covered as this interface should be specified separately. Nonetheless, token based gas subsidies can be enabled by assining a smart contract as `_spender` and encoding token to gas fees in `extraHash`.

### Interface

```
function metapprove(
    address sender,
    address spender,
    uint256 value,
    uint256 nonce,
    bytes signature)
public returns (bool success)
```



