---
id: babylon-solution
sidebar_label: Babylon's Solutions
sidebar_position: 1
pagination_prev: null
pagination_next: null
custom_edit_url: null
slug: /
---

# **Problem Statements**

## Underlying Security Issues within Proof-of-Stake

Proof-of-stake (POS) is created as an alternative to Proof-of-work (POW), the original consensus mechanism used to validate a blockchain and add new blocks. Proof-of-stake uses a mechanism to where the cryptocurrency owners validate block transactions based on the number of staked coins. 

In POS, one voter can only vote for a maximum of one
block at height two. For instance, one voter can only vote for one
candidate when choosing a leader in an election.  For a block to be confirmed, it must receive 2/3 of the votes. A
supermajority vote is 2/3, while a majority vote is 51%. Therefore, if
2/3 of the population votes, we declare that a block is confirmed.

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image5.png?raw=true)

However, POS, by design, has security vulnerability if there are two forks and both blocks (seen in the figure above,
circled) have 2/3 of the votes. It will generate the total votes to be greater than 100%, or 133%.
It indicates that at least 33% of voters cast two votes, a practice known as a **Double Signature Attack**. This
goes against the protocol, which is not what it is intended to be.

The typical POS blockchain punish the double signature attackers by **slashing** them from
the chain. The attacker\'s tokens and authority will be removed/slashed
from the blockchain. If their double signature attacks are detected, it
removes the user\'s tokens from the blockchain and their voting power in
the Proof of Stake system. However, the attackers may find a way to prevent the slashing and make
slashing impossible for the chain. A few attacks are slashable, but a
few remain unslashable due to the attacker exploiting the inherent,
fundamental security issue of Proof-of-Stake.

The attacker can resign from the network by **unbonding** to lose the
membership of the voting committee intentionally. In turn, their staked
tokens will be returned along with their public key, private key, and
other data, which they can trade freely now.

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image8.png?raw=true)


When a voter withdraws its staked tokens, the voting committee will be
replaced by new members, and the old voter can now become an attacker by
creating a similar fork using the same keys. Upon observation, both
chains will look similar. Now here comes the issue, since the voter has
already withdrawn their stakes from the original chain, they can't be
slashed.

The voters can also sell their valid public keys; even after the sale,
if they use their old keys. If the voter unlocks their token at block
100 on height 2, as shown in the image above, they will have voting
power because they are still voters with stacked tokens.

Imagine that this is done by 2/3 of the voters here who have resigned from
the chain. They can create a child block at height 2 and they can't be
slashed. So, this is the fundamental security issue of POS chain systems
that cannot be resolved no matter how you modify the problem. Because
the foundation of a POS system is to let the user stake their tokens,
but people are surely entitled to resign and get their tokens back.

POS also have weak subjectivity vulnerability where it relies on the founding team or a cryptocurrency owners that staked the most coins to perform a check to detect any potential double signature attack on chain. This solution is a subjective solution and can create delays and potential human-error mistakes because people rely on human actors to tell them which fork to choose. There should be a better solution to check the chain objectively.

#  

# **Babylon's Solution:**

The issues discussed above are what we aim to tackle. The attack
is only possible if people in the original chain have quit and there's a
temporal delay between the original and forked chains. The solution to detect and prevent the attack is by providing a trustworthy timestamp. However, the timestamps in
a blockchain block are meaningless since anybody may insert arbitrary
timestamps, so on-chain timestamps cannot be trusted.

Our solution provides a trustworthy timestamp to indicate when this block was
produced. It  So, for this purpose, we use **Bitcoin** as the
**timestamping** service. We use Bitcoin because it is the most secure blockchain in the
world. In Bitcoin, a fork can never be longer than 6
deep. If the latest block height is 1000, you can be sure that blocks 0
to 994 will never be forked. Blocks 995, 996, and 997 may be forked, but
994 and older will not be forked.

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image3.png?raw=true)


This means that the checkpoint of any chain that appears after the 6
blocks deep can be ignored. Suppose there are 6 blocks, as shown in the
image above, if we already see Block 6 there, we can safely say Block 2
is confirmed. Because to create another fork, you must be faster than
all existing miners to create the remaining blocks; this way, long-range
POS attacks can be avoided.


## 1. Direct Checkpointing Limitation

A POS chain can checkpoint its blocks to Bitcoin. But Bitcoin has a
restricted space and is pricey. It only allows 80 bytes of arbitrary
data per transaction. However, each checkpoint includes a 32-byte hash
of the block and a signature to prevent attacks. Now, the signatures are
large, and there are dozens or hundreds of votes that we need to
checkpoint. 

It will take at least a few kilobytes, and you can\'t fit it
into a fair number of Bitcoin transactions. For 5000 bytes of data, we
will need at least 60 Bitcoin blocks to carry one checkpoint, which is
both pricey and abusive usage of Bitcoin, which is not welcomed.

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image1.png?raw=true)


## 2. Our Solution

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image2.png?raw=true)

To solve this, we add Babylon in the middle. So the PoS chains will send
their checkpoints into Babylon, and inside the Babylon block, you will
see the checkpoints of the PoS chains. Then Babylon checkpoints its
blocks to bitcoin. All the transactions, or the Babylon transactions,
inside the Babylon blocks will have Bitcoin timestamps.


![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image9.png?raw=true)

**Babylon transactions** are the checkpoints of the PoS chains. So the
PoS chains will indirectly get Bitcoin timestamps by using Babylon.
Babylon must protect itself since it is both a cosmic chain and a PoS
chain. In front of BTC, Babylon serves as a load balancer, accepting the
shared massive volume of data from the PoS chain.

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image7.png?raw=true)

Babylon send checkpoints to Bitcoin and accepts checkpoints from many
PoS chains. In the future, we want to allow the general public to
checkpoint their arbitrary data to Babylon. In the image above, between
the orange and blue, it\'s intuitive. The blue block just sends your
checkpoints as Babylon transactions.

<br/>

## 3. Babylon Architecture

### 3.1 Babylon BLS Signature Algorithm

We do not use just hashes for our POS blocks, we also use signatures
so that not everyone can send in hashes and claim it as a Babylon
checkpoint. As the signatures are large, we do not use traditional
signature algorithms, we use BLS. The BLS signature can be aggregated
and used to verify the merged signature.

For example, two signatures of 40 bytes each can be merged and formed
into one signature of 40 bytes. Similarly, the public keys can also be
merged into and used for verification. That means no matter how many
votes Babylon received, it can be aggregated into just one signature,
which is only about 40 bytes.


![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image10.png?raw=true)


From the Babylon chain to BTC, we send a **BLS multiSig** and a
bitcoin transaction called an **op_return** transaction that allows
you to carry some arbitrary data. The size of the checkpoint that
Babylon sent to BTC is only about 150 bytes, which two Bitcoin
transactions can carry. Each Bitcoin transaction carries 80 bytes, and
two transactions can carry 150 bytes for a checkpoint.

### 3.2 Quorum Certificates (QC)

Babylon use the BLS signature algorithm to generate **Quorum
Certificates (QC)**. Technically, a quorum is a threshold number of
votes needed to certify a transaction as approved. A Quorum
Certificate means the quorum community reaches a consensus and creates
the vote, which then becomes certified and has been approved.

The Quorum Certificate in Babylon is very small. It's only about 40
bytes because we use the BLS signature algorithm to aggregate all the
forks into one application code. This small amount of QC is the way to
solve the problem where the checkpoint is too large.

### 3.3 Babylon Vigilante Roles

Vigilante means someone who voluntarily contribute to protect babylon.  Babylon has three vigilante roles who voluntarily contribute to the security of Babylon by uploading, downloading, and
monitoring work. Babylon will reward them through Babylon tokens.

-   **Vigilante Submitter:** who submits Babylon checkpoints to BTC.
-   **Vigilante Reporter:** who scans the BTC and then reports back to
    the Babylon chain.
-   **Vigilante Monitors:** which compares the consistency between
    Bitcoin and the Babylon chain.
<br/><br/>

## 4. Key Design Features

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image4.png?raw=true)


### - **BLS multiSig**

Our BLS multiSig reduces the checkpoint size which allows our users to use our solution to secure their chains.

### - **Epoched validator set rotation**

In a standard PoS blockchain, you can subscribe as a staker to lock
your token and gain voting power at any time, and you can resign to
return anytime. Whenever someone does this, the people who can vote
change.

**For example**, all the Babylon validators have locked half a million
Babylon tokens. When you join the party, you lock 1,000,000 Babylon
tokens in Babylon block 100. That means that in block 101, you will
instantly become a validator or voter with 1,000,000 votes.

You are not eligible to vote for Block 100, but you are eligible to
vote for Block 101 because at Block 100 you submitted a request. That
means that the validator set changes between 100 and 101.

We introduced a concept called **\"epoch\"**. Each epoch consists of,
for example, 500 Babylon blocks. Within these 500 Babylon blocks, the
validator set cannot change.

Let's take the example of three validators. These validators make all
the decisions between blocks 1 to 499, any new validator is not
allowed to join their party, and none of them can leave it. All these
500 blocks are decided by those 3 validators. That means in order to
hold them accountable for any attacks, we don\'t have to checkpoint
every single block they have created; we only need to checkpoint the
last block. We only need to checkpoint once per hour and submit two
Bitcoin transactions.

***Why do we set the number in the order of hundreds? Why not make it
shorter than 100, or make it 1000, or 1 million?***

If it is too short, it will cost us more because we will send more
checkpoints to Bitcoin. A smaller number is expensive, but it will
provide our users with a better experience because, for every epoch,
we will send the checkpoint. The checkpoint interval of half an hour to an hour is a reasonable
choice. If it is less than that, we can't afford it, and if it is too
long, then the users will need to wait too long.

> The more checkpoints we send, the earlier our users can get their
timestamps. If we send a timestamp every 5 minutes, our users will expect to receive a timestamp every five minutes. If we only send checkpoints every hour, our users will receive their timestamps once an hour.



### - **On-chain BTC oracles**

### - **No change to Tendermint**

<br/>

## 5. Babylon (BBL) Modules

We have some modules to achieve all these features internally. We have
an epoching module inside the Babylon code base. No matter what language
you use to write the program, this program will consist of different
components and modules. They are wired into one program, and each module
corresponds to a thread or process within the program.

![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image11.png?raw=true)


### 5.1 Epoching Module

The Babylon node is a binary executable; when you install it, you will
be running the Babylon node. The program has different threads inside,
and the epoching module is one of them.

This module does not allow the validator set to change within the 500
blocks. It will delay all the transactions that request to become
validators until the end of the epoch - these requests will not be
executed until the end of the epoch, so there's no change within the
epoch.

### 5.2 Checkpointing Module

The checkpointing module creates checkpoints in Bitcoin and manages
their status, such as whether they are 6 deep enough, 10 deep, or 20
deep, and whether they are ready to be confirmed.

### 5.3 OP_RETURN Oracle Module

The OP_RETURN Oracle is called an operator because the BTC transaction
that holds this is called an operator transaction.

### 5.4 BTC_Header Oracle Module

BTC Header Oracle logs the BTC header chain so that within the Babylon
program, we know what the bitcoin chain looks like or how long it is.

## 6. Vigilante Master Monitor


![Alt text](https://github.com/cahyosubroto/sample-docs/blob/main/image/image6.png?raw=true)

In Vigilante Master Monitor, the BTC light client will act as the master
monitor that will track the correctness of a BTC header oracle because
the Babylon nodes can't just directly talk to Bitcoin by themselves. The
difference between a full node and a light client is:

-   **A full node** is a node that stores the entire blockchain,
    including the headers and blocks. It embodies all transactions and
    executes them.

-   **A light client** does not store the block or the transactions, nor
    does it execute them. A light client only stores the header. The
    header is very small, and even if you have a very long blockchain,
    the storage requirement is still quite minimal.

**Example:** If a Babylon node A asks its Bitcoin node about block 60,
it may answer yes to A, but if B asks the same from its Bitcoin node, it
might get a negative answer.

#### ***Why is that so?***

Because they may have different network latencies. One node can be
slower, and the other may be faster. That is why communicating with a
Bitcoin node separately may not give the same answer.

So that\'s why we have a BTC header Oracle within the Babylon module to
ensure everyone sees the same Bitcoin chain. This BTC header chain of
information is provided by the reporter, which we don\'t trust. So we
need a monitoring program to ensure that what the reporter told us about
BTC is the same as the real-world BTC.

## 7. The Cost

Each checkpoint will cost us about \$2.00 per transaction. No matter how
many customers use Babylon, our cost will always be \$2.00 per transaction.

When the PoS chains checkpoint to Babylon, they submit a Babylon
transaction to record the hash of the PoS chain block header. So this is
packed into a Babylon transaction and sent to Babylon, but for the
Babylon network to accept this transaction, you need to pay the
transaction fee.

The POS chains will pay Babylon, not in the form of a contract or
subscription fee. You pay a transaction fee, not a subscription. **For
example,** when you submit a transaction in Polygon, you must pay the
Polygon nodes a transaction fee. Similarly, when you submit a Bitcoin
transaction, you pay Bitcoin miners a transaction fee. So, Babylon will
collect transaction fees for whatever data you checkpoint to it. The
larger the size, the higher the transaction fee.

Because Babylon is a decentralized system, there is no contract to sign.
There is no company behind Babylon. So our team will maintain the
network, but that doesn\'t mean we own the network. All the community
members and validators own the network. We can\'t claim all the benefits
or the income.
