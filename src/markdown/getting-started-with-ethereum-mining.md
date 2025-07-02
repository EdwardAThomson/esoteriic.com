---
title: "Getting Started with Ethereum Mining"
date: 2017-06-24T13:36:53.000Z
category: blockchain-and-cryptocurrency
author: "Ed Thomson"
---

On the back of the recent cryptocurrency boom I decided to try building a mining rig. This guide takes you through that process from beginning to end. This guide has Ethereum in mind but it could be almost any cryptocurrency. Be aware: proof-of-stake is coming soon to Ethereum so mining may no longer be profitable by the end of 2017.

**The steps in brief**:

1.  Build / purchase a rig
2.  Install an operating system
3.  Install latest drivers for graphics card
4.  Download mining software (Genoil / Claymore)
5.  Create a wallet with MyEtherWallet (MEW)

Follow those steps and win.

**Steps in-depth**:

The above is basically what I did and by following steps you should be able to start mining Ethereum. That said, there I did take me a bit longer to get up and running as there were a couple of issues along the way. This section of this post gives a few more details on that process. For a lot of components: cheaper is better since there is less cost / risk and you hit break even quicker. For graphics cards you are looking at mid-range cards in terms of best performance for the price.

1\. Building a rig
------------------

*   **You need**:
    *   Motherboard, CPU, CPU Fan, RAM, Hard Drive, PSU, graphics cards.
*   **Optional**:
    *   keyboard, mouse, monitor. Going to assume you already have these. Also worth considering extra fans

**Motherboard** – arguably this is the most important part. It will determine which CPUs you should buy. AMD boards require AMD chips, and Intel boards need Intel chips. An AMD board which is sock AM3+ can take AM3 and AM3+ cpus (the boards are backwards compitable). There is aboslutely no need to get one which supports DDR4 in the current climate. DDR3 is sufficient.

The board does not need to be expensive but it needs to have multiple PCI-express slots. This is probably the biggest requirement. They don't need to be full-length PCI-E slots but it should be noted that PCI slots won't work (AFAIK!). More slots allows for more graphics cards, and it should go without saying that it is the graphics cards which will be doing the mining. Having 4 – 6 PCI-E slots will be good.

Buying new, or nearly new, is probably best. You will find that many motherboards will be sold out. Especially anything which has "BTC" in the name. There are a couple which are geared towards cryptocurrency mining.

**CPU** – choose a CPU that matches your motherboard type. It doesn't need to be the latest CPU. Think about costs: Pentiums, Celerons, Athlons, Phenoms are all fine. You don't need a 4 core mega processor. The computations are all done on the GPUs so if anything the CPU will be underused. There is no need to buy new either.

**CPU Fan** – purchase one that sufficiently matches the power of your CPU. Yo u can find power ratings on Amazon and pc part picker (also from manufacturer websites).

**RAM** – DDR3 is absolutely fine. You don't need more than 4GB. I wouldn't go less than 4 but you certainly won't need 4GB. Make sure you buy Non-ECC (Non-Error Correcting).

**Hard Drive** – buy a cheap SSD. It doesn't need to be big, but just enough to hold and operating plus a bit more. You probably want at least 30GB. You could buy an HDD and there are many cheap ones but the extra space that you is probably unnecessary. Some rig building guides strictly recommend against HDDs but I can't quite see why.

**Power** (PSU) – if you are running multiple cards then you want to have a decent power supply. It probably isn't worth trying to save here. Getting an efficient (Platinum) power supply ought to help save on electricity costs in the long term. I know that some students get "free" power in their student apartments but longer term it won't make sense. Many guides suggest buying a 1200W platinum PSU. This is about right if you go for 5 or 6 graphics cards. I actually suspect that the cards will never run at full power so you in theory you might not need more than 800 but not really worth the risk.

Buy new and give yourself piece of mind.

**Graphics Cards** – the work horses of your rig. AMD cards give better bang for the buck, but good luck trying to find them. The cutting edge expensive Nvidia cards will be far too expensive for the rate of returns, so look for cheaper cards.

Current good picks: AMD RX 470 / 480 / 570 / 580. Nvidia 1060.

**Monitor** – You don't need to buy a monitor if you already have one (or a TV with HDMI in).

2\. Install an OS
-----------------

Assuming you know how to put thr rig together you will need to install an OS. I tried to install Linux from a USB but found out that the motherboard I have doesn't have good Linux support. So had to go for Windows (using a USB stick). It is actually possible to install Windows for free.

From Windows you will need to use the Windows Media Creator tool which is available from Microsoft for free. Download this and choose the option "Install Windows on another computer". I did this with Win 10. When you are asked for a license key while installing just click "add later" (or similar wording). If you have a DVD burner and empty DVDs then perhaps you can burn a copy of Linux and try to install it by plugging the DVD drive into the new motherboard.

There are numerous Linux flavours which have the mining software already instaled but I haven't had a chance to test those.

3\. Install lastest graphics card drivers
-----------------------------------------

On a fresh install you will likely have sub-optimal settings. Go to AMD's or Nvidia's website and grab the latest drivers for your cards. Also worht looking into software for over-clocking.

MSI produce a free piece of software called Afterburner which lets you over-clock cards from many different brands.

4\. Download mining software
----------------------------

Two of the most popular miners are Genoil and Claymore. The latter is slightly faster but charges a fee when you mine.

For Genoil (almost the same with Claymore though): download the zip file from Github and extract it. You will need to edit the start_opencl or start_cuda file before running the .exe file. In order to receive the ether you mine you will need to have a wallet. The quickest way to do this is to go to MyEtherWallet.

Make sure you save the file.

5\. Create a wallet
-------------------

Go to myetherwallet.com. This will create a new wallet for you. The code executes inside your browser on your machine. So the whole process is local.

Run the miner  
After editing the start_opencl / start_cuda file you just need to double-click it in order to get it to run. It is a .bat file which calls ethminer.exe using the configs you just saved in it.

Alternatives to Ethereum
------------------------

There are many alternatives to Ethereum, including Ethereum Classic. The process for mining those is pretty similar to the above.

*   Get a rig.
*   Install an OS.
*   Install the mining software for that coin.
*   Get a wallet.
*   Start mining.