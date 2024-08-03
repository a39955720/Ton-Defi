import "@stdlib/deploy";

// Define messages
message ReceiveUSDT {
    amount: Int as uint32;
}

message ConfirmEthTx {
    success: Bool;
}

// Define custom events
message USDTReceivedEvent {
    sender: Address;
    amount: Int as uint32;
}

message EthTransactionConfirmedEvent {
    sender: Address;
    success: Bool;
}

contract TonDefi with Deployable {
    owner: Address;
    usdtReceived: Int as uint32;
    ethTransactionConfirmed: Bool;

    init(owner: Address) {
        self.owner = owner;
        self.usdtReceived = 0;
        self.ethTransactionConfirmed = false;
    }

    // Receive USDT and update the state
    receive(msg: ReceiveUSDT) {
        self.usdtReceived = self.usdtReceived + msg.amount;

        // Emit USDT received event with sender information
        emit(USDTReceivedEvent{sender: sender(), amount: msg.amount}.toCell());
    }

    // Interaction with Ethereum contract
    receive(msg: ConfirmEthTx) {
        self.ethTransactionConfirmed = msg.success;

        // Emit Ethereum transaction confirmation event with sender information
        emit(EthTransactionConfirmedEvent{sender: sender(), success: msg.success}.toCell());

        if (msg.success) {
            self.issueNFT();
        }
    }

    // Issue NFT after confirming Ethereum transaction
    fun issueNFT() {
        emit("NFT issued".asComment());
        // Logic to issue an NFT on the TON chain
    }
}
