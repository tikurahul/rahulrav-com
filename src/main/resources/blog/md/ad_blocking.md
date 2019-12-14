Dec 14 2019, Saturday

#### Ad Blocking

I have been using [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en) for a while, and can't imagine browsing the web without it. 

Everytime I am on a machine that does not have it or I see someone else browsing the internet without it, I cringe a little. I am constantly overwhelmed by the number of ads and and their poor quality. The situation is especially bad on mobile browsers.

I know the irony in saying this, given I work for a [company](https://google.com) that has one of the largest ad networks. 
The ethics of ad blocking are debatable, but user security is not. I have seen too many ads out there that hoodwink users, and waste copious amounts of bandwidth.

Given that most mobile browsers don't support an ad blocker, I setup [Pi-Hole](https://pi-hole.net/) which is a DNS based sink hole for ads. Also unfortunately named, I might add.

#### Pi-Hole

I used an old [Asus Tinkerboard S](https://www.asus.com/Single-Board-Computer/Tinker-Board-S/) that I was no longer using.
I flashed the latest version of `Debian` and just ran the `Pi-Hole` installer. Things just worked. 

I enabled the DNS server to bind to all Network interfaces on the `Tinkerboard S` (via `Settings -> Network -> DNS` on the admin panel). After this, I ensured that the `Tinkerboard S` would get a reserved IP from the DHCP pool. I did this using the `Google WiFi` app.

Once i got those steps out of the way, I turned off all the other DNS servers and made my `Tinkerboard S` the only DNS server, using the `Google WiFi` app. 

Now that I had a network wide ad blocker, I disabled all conventional ad blocking software.

#### Conclusion

`Pi Hole` is an incredible project, which gives us back some much needed control. If you have an old single board computer lying around, give it a go and don't forget to donate to  `Pi-Hole`. 
