---
id: intro
sidebar_label: What is Babylon?
sidebar_position: 0
pagination_prev: null
pagination_next: null
custom_edit_url: null
slug: /
---

# Bitcoin Security for Cosmos and Beyond

Let us learn about Babylon in this article. 🚀

## Babylon Overview

Babylon is a new Cosmos project whose vision is to leverage the security of Bitcoin for enhancing the security of Cosmos zones and other PoS chains. In this first post, we will give a bird’s eye view of the project and in the subsequent posts, we will delve deeper into its the various use cases.

## Who are we?

Our team consists of consensus protocol researchers from Stanford and experienced layer 1 developers from all over the world. At our Stanford [lab](https://tselab.stanford.edu/), our previous [works](https://tselab.stanford.edu/research/blockchains-decentralized-systems/) include both basic research as well as collaborations with industry projects. For example, a recent work is a collaboration with Ethereum Foundation on improving the security of the Proof-of-Stake Ethereum beacon chain. We identified some critical [attacks](https://news.bitcoin.com/a-new-academic-paper-describes-3-attack-methods-against-an-ethereum-pos-chain/) as well as designed [optimal](https://arxiv.org/abs/2209.03255) protocols to achieve the objectives of PoS Ethereum.


## Bitcoin as a Source of Trust

Bitcoin is the most secure blockchain in the world, secured by the immense hash power of Bitcoin miners. Currently this security is used primarily to support one cryptocurrency: Bitcoin.

:::info Vision

The vision of the Babylon project is to leverage Bitcoin as a **source of trust** to benefit other blockchains in the broader ecosystem.

:::

The value of this source of trust can be further broken down into two aspects:
<details>
  <summary>Bitcoin is based on <code>Proof-of-Work</code>, while many other current and emerging blockchains are based on <code>Proof-of-Stake</code>.</summary>

**PoS** chains as Cosmos zones have certain security limitations compared to **PoW** chains. A properly designed architecture leveraging Bitcoin can potentially remove these limitations. In fact, **PoS** and **PoW** have complementary strengths, and a properly designed architecture can obtain the best of both worlds.

</details>

<details>
  <summary>The security of a blockchain is determined in large part by the <code>value of the resource that supports it</code>.</summary>

In a **PoW** chain, it is the cost of the hash power. In a **Cosmos zone**, it is the value of the cryptocurrency that is being staked. Viewed through this lens, there is a wide spectrum of blockchains at different security levels. Supported by the immense hash power of its miners, Bitcoin sits on one extreme of this spectrum. Smaller blockchains, such as Cosmos application-specific zones, sit near the other end of the spectrum. A properly designed architecture leveraging Bitcoin can enhance the security of these chains without compromising their autonomy.

</details>


## Bitcoin as a Reliable Timestamping Service

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

In Nakamoto’s <button name="button" onclick="https://bitcoin.org/bitcoin.pdf">whitepaper</button>, the Bitcoin blockchain was introduced as a timestamping server powered by Proof-of-Work. It gives an irreversible time-ordering to events. In its native application, the events are the execution of various transactions on the Bitcoin ledger. In the present application of enhancing the security of other blockchains, Bitcoin can be used to timestamp events that occur in other blockchains as well. Each such event triggers a transaction that is sent to the miners, which subsequently inserts it into the Bitcoin ledger, thereby timestamping the event. These timestamps on Bitcoin can be used to resolve various security issues with the blockchain. The general idea of timestamping events in a child chain on a parent chain is called checkpointing, and the transactions that timestamp the events are called checkpoints.

## The Babylon Architecture
![Example banner](https://img1.wsimg.com/isteam/ip/6f380b15-78c1-4a0d-9bc4-3e2fa49378cf/architecture.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)

The Babylon architecture is shown above. It consists of three components with two levels of checkpointing:
1. Bitcoin, as the <Highlight color="blue">timestamping service</Highlight>.
2. The Babylon chain, a Cosmos zone, as the <Highlight color="blue">middle layer</Highlight>.
3. Other Cosmos zones, as the <Highlight color="blue">consumers of security</Highlight>.

An important design consideration is that Bitcoin has very limited capacity in carrying arbitrary data. In this context, the Babylon chain serves several functions:
- It aggregates the checkpoint streams of many consumer zones so that only one checkpoint stream needs to be inserted into Bitcoin to simultaneously timestamp events in all the consumer zones.
- Its checkpoints into Bitcoin can be made compact using cryptographic techniques such as aggregate signatures.
- It receives checkpoints from the consumer zones via Inter Blockchain Communication (IBC).
- It checks for the availability of the data behind the checkpoints of the consumer zones so that an attacker cannot timestamp unavailable data.

## Use Cases
1. [Fast Stake Unbonding](https://babylonchain.substack.com/p/babylon-for-fast-stake-unbonding): Proof-of-stake chains require social consensus to thwart long range attacks and this leads to [long unbonding periods](https://babylonchain.io/blogs/f/why-is-stake-unbonding-so-slow). In Cosmos, this is typically 21 days. Bitcoin security replaces social consensus and reduces unbonding periods to 5 hours.
2. [Bootstrapping new zones](https://babylonchain.substack.com/p/shared-security): Bitcoin security can be used to bootstrap new zones which have low token valuation.
3. _Protecting important transactions_: Bitcoin security can be used to protect important transactions while normal transactions get fast finality.
4. [Censorship resistance](https://babylonchain.io/blogs/f/censorship-resistance-via-babylon): Transactions that are censored can use Babylon as a backup to enter the ledger.

## Technology

:::tip Babylon Technology

Wrapping a theme is a great way to **add extra components around existing one** without [ejecting](#ejecting) it. For example, you can easily add a custom comment system under each blog post:

```js Technology
1. Core primitives for writing timestamps onto Bitcoin by the consumer zones and reading the timestamps on Bitcoin by the consumer zones.
2. Protocols that use the timestamp information to realize the various use cases. Both the core primitives and the protocols will be described in the following posts.

```

:::