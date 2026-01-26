## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
  integrity="sha384-5xdYoZ0Lt6Jw8GFfRP91J0jaOVUq7DGI1J5wIyNi0D+eHVdfUwHR4gW6kPsw489E"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"
  integrity="sha384-HdearVH8cyfzwBIQOjL/6dSEmZxQ5rJRezN7spps8E7iu+R6utS8c2ab0AgBNFfH"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-JUyb8d0nZ1inOkUmauJVlq7Z3qvEcs2tn+0MCfdtPJCOp3pgsL60LoMb+1Ht6JZG /es/languages/abnf.js
sha384-fExacwevjaxWOjfZ4u5wK9AhGBB7cIpf9poF5tuE2ks+Cq7jrxdO6xMIWHtkExtu /es/languages/abnf.min.js
sha384-DZ/QAiGsDoaeLPHAnnWQ+KAi+ISBMQ1jorfzWY5B6Nck/LEW5BrlynsA7GqEwyq4 /es/languages/arduino.js
sha384-5fqRyRDjJwFL5ud85A5a43LTiHQYvuRA8aoZQfQmjEKTQzQ58xBXhKVxno6hb/yS /es/languages/arduino.min.js
sha384-+podZ7vcyPFT/3VNlVH5UNb//7AUAgNin4DT3sfVvkwfvESxszn+AIZzClBgjMac /es/languages/awk.js
sha384-EHnfKoIoapCq56z5MHMlmX+azfja6Qd7pXAV3984kggFfPSWT9f9U96k/Yjm3dfy /es/languages/awk.min.js
sha384-gRTR/fmk+6+ygbihH/fJvHgmffnOrd/eO7DW5zgu1uN9GBohtDx+OBs0DI0ejigB /es/languages/bash.js
sha384-Pg7b9hYE6kefjcNqAabhv8jOLCVoZubUaM4bZFjUJd0CaaQ14ksDI0GVllMtAF4S /es/languages/bash.min.js
sha384-QHbn99pVnzMc1eTlAHuzezde2oeInU8mH7zlG4cQ70jpXfjfoD531aUjUzxEjGHC /es/languages/bnf.js
sha384-UqgBDF2X+N1GebyqNxeti8OeNEMW7n/TzYibf/T/xNJp/W7GZOlaFHLM/kxsSAuU /es/languages/bnf.min.js
sha384-xhohaHGp8S443Qn4JZUYAcKqIIl0bQkFA79EUxpbX8GWb5oufdvvSI9ipl/Dasev /es/languages/c.js
sha384-xaTVEdq02jgKStoYDcZD8NhTN1XV/TWpIu4OM53MtMiLl08+e9YJNENo+R/6Nwp0 /es/languages/c.min.js
sha384-rFCBWxbZHxZD51qKR2cdayIcKUSHS3p1PWPIs1kjgsP7lu9ZP32ah/2DoQUm/rTg /es/languages/cpp.js
sha384-+1Koxl0St78gEZW5CpFK+dbLp7yNsfwLzzQUsSGimV4k/RVJUz6YvqtsqtdbJyKf /es/languages/cpp.min.js
sha384-Gmvct15f4Mo9AXQG5bk5w78N1YjBLXXU3KIV7no+mOVnApXlwfw1dwjfueAwljIV /es/languages/css.js
sha384-1D7DbOic0Z5nM2ldSO9O/EsBfsg/5x7X7So1qnMgscI2ucDevptcg7cTvrD9rL0D /es/languages/css.min.js
sha384-CxgzMCYCdPS3oPSgukCqpDiqHKDKcrLdlyMqy9UF73u63+XVRlI32OproboitNa6 /es/languages/diff.js
sha384-joI34L4jMJOgkz6zOb3sqraHH5tmocRfXvs9HkdHfUpD3ceSxAqKlubpBT/4Q/sV /es/languages/diff.min.js
sha384-IZPwfVGChjxiFn/yRHid99p+81wHZKppqSWzWv3/VpfILbOfX+FBbsAEjyYEz+08 /es/languages/django.js
sha384-c6VNDV3sM+ivvQX1L4LuDW3MjiYsC6u70/NKATWDBfdRODoECdSJ7oUhpcU/WBUi /es/languages/django.min.js
sha384-GjF+59AA+OY/6RDsvWxm3u318l0CruHb/Fm3oywrHZWho96FKyPUFnoIKqCKiM4D /es/languages/dockerfile.js
sha384-qyGdaK2usg+DEmSJUcr3Rogi6miy7A1Rn8QlRc71wBlMHpN1Y4b3d8hh2hf31dCu /es/languages/dockerfile.min.js
sha384-shXrwieu5ai9YtuhcQHaKKsevtNwVuGb4feBZwLL0OrWxFkhG3/C8wA59pn5SeDF /es/languages/ebnf.js
sha384-QVixKXA4tPisshbP4uNyLPdjm9n9p0/UX26/y6Qi5do5oJq2TiyTYLJuNXVqbUz/ /es/languages/ebnf.min.js
sha384-HSr+TD3IkBbR0oASHT5rysX8q2MUc+g5O7+hCWJn5YqXZo0FxtlZ8tVzS10o5zjW /es/languages/glsl.js
sha384-BAQNawDeoCUPCZWWabbjBwXCREsauI9uBgfmsygn0IxSgWsk3mnYN0rssUPupU4s /es/languages/glsl.min.js
sha384-4KHgeVApl7jyaii3nRNIPEXOue+bFJle0RIjcm9E3kTztsYswLXnqwWffaY3efyN /es/languages/gradle.js
sha384-oyVD4OXJqCzAuLvR01l8RW90iC0xtJ5/qMUM8wVgDWv5Tz9AAimez46a93CdRXcE /es/languages/gradle.min.js
sha384-lS8MhjpHUEvvJJlp7/yqS1D8YriG6je8y2ueR0p7aFbdKIjrS/zzUWa8myxfiSB3 /es/languages/handlebars.js
sha384-Y3QRR1LoAMi3J7E26nRUoSLKhp1J85o9+C5V2bbNZzIxjxkpQSeaH9dIUfCfqWsJ /es/languages/handlebars.min.js
sha384-uC39e4pRTIrenlpo9NQf2taOPhdRJNaZLFASSg+Q8BLjYqLXvxL8brjzQmJEQ0qn /es/languages/http.js
sha384-36ZwsK42N/jk3DquJeJr/r/oziBOtUxBcg0ZdTaaEDX+Zo/UMgBP4S2Sf4NEyq1y /es/languages/http.min.js
sha384-lk+aAr+DNq8Rz3hXPSZ7ga38GS+tQfXDvexuUnyDCSju1t1SAsLipVIFGlRtcUjE /es/languages/java.js
sha384-5GpB6kfA2w03pZhAUmmNSYvR5pLvne/Rzqc22BmHv+t9ES7ifMX/ZE7x5TBeqW4d /es/languages/java.min.js
sha384-g7t9fKR5Tvod4iWv7BQXN+/JMn5GT9sD6FG3h7Fgl+KCv5k4NnnCzEqUe7BMJ9Mv /es/languages/javascript.js
sha384-f7huPivS1dV2T5V+g0aJpgsY7WBHWCsioIq30tpNoXGizD65fWJYGuXXVPNI52VB /es/languages/javascript.min.js
sha384-8CRS96Xb/ZkZlQU+5ffA03XTN6/xY40QAnsXKB0Y+ow1vza1LAkRNPSrZqGSNo53 /es/languages/json.js
sha384-UHzaYxI/rAo84TEK3WlG15gVfPk49XKax76Ccn9qPWYbUxePCEHxjGkV+xp9HcS/ /es/languages/json.min.js
sha384-74O59Gvm0duu3aXH7S8RHhqn8YvAF1JlgCdNDq5MaClY/f/0bMs4zryv55Whwp2c /es/languages/kotlin.js
sha384-+aJFpyNBGTRiXRDN6BLrctauQBKExwSosxOiHLUYReXKTsckW/RgMavqX6W+zTBL /es/languages/kotlin.min.js
sha384-Ap4gnRYGNAeKXru7neutEvzrhsYnnP1suT5zxW2zdmv6rCl43QzqqLEJ1F3kZWWm /es/languages/latex.js
sha384-bx4oC5pPCnrSzdPzDg3L9UsoJWiptFFwoGWKup6bRk82EzPFrquQa7T7I9iDwnXa /es/languages/latex.min.js
sha384-G8Zl3te56ft3aGpe25uWefXidaWzErZNty1FuVVPzapgLdI9KGeqi440JMcGSrpK /es/languages/llvm.js
sha384-5/rMDjrvVizUEgvQXzdMw4bEnPi4rc4g55j6uygbCX563PiwUWOt1DOFg8nWOW4k /es/languages/llvm.min.js
sha384-5TnIBSbRIGDilxscXgaTNLZ8PZ9u7TEBPzF8b9z+wrbTN3e89MbD9zSSuDVdbDFj /es/languages/lua.js
sha384-HCBq0pjgKyOc3FNX31to33MxfNYza3HCbHLfWwdsnkH5r/VmmXTlRrvWSHTJyYvA /es/languages/lua.min.js
sha384-+KkqXkoHKtuOmUzhZ0BjyV0qjljnS+z6i4fELMEg5brFPtmDIog4zZMhylaBTsVi /es/languages/markdown.js
sha384-E7UvgBH6skA1FIOcn3B2c68GtJzrmZlOOC5p/fsxwihTZG/bBedJZu5PC1+kGX7q /es/languages/markdown.min.js
sha384-V1naTapX08eXbOlk/ff334/j1cqIcSKIL8iFF7fabEzwo0662EJWXaMPDMMdyXZ/ /es/languages/nginx.js
sha384-7QaPTK4CkHm5HP+HbJ7BwALXSAvCln1ofcgr0Myla2I3O6cU/pupqPnajKmyy03P /es/languages/nginx.min.js
sha384-6ziOLhWWyCEJ+Ho7frmiIJ+W0ZbVi6s9RxHsd1eF5DuGk117NZLm1mrWubXPjwhn /es/languages/properties.js
sha384-/jY3EnpQIhHPBJqje2gBbmlolzDCUfluYNls4EgMz6K8V1eGkYfd1EJBM0tepwl0 /es/languages/properties.min.js
sha384-xQzMqANefDEXaHryNxgpG6EGwOHlOmpMcu2XchrFwFI7Vx1XybxebV9PkksMbkJE /es/languages/protobuf.js
sha384-TLEjnB/5SQ3m7Vyn2l8PAHrw3XEapQeXk3i2z9nmdjsjoEj7TZ80bdAbhVRXS9Oa /es/languages/protobuf.min.js
sha384-Cmq5lORXzyHraasLNqmfchH07JRXyEmjDF+j6tSggoXjYHwtgX/ySW6kkRytM5uu /es/languages/python.js
sha384-ZV5sgX70bBgLkDR5Mtox5UsbJedBc39hRKPdvTw6miK4lSkE/wv94cLY2iyZb/sB /es/languages/python.min.js
sha384-JFRCn12yvr0NDhxPY8oZDk/G2Tjm7bGmqXy28Y0bq4J7D8mKha6jQJOXMB5wtTVr /es/languages/rust.js
sha384-JbkB8w/DGGyx29PIwSq8c/ZeiJB9T/X4mVAZFEyBiNlEAas98Q2NxpBPUlNIlE71 /es/languages/rust.min.js
sha384-R67rULqIohpEyV6aFbjxRv7xhK8v/KteX4cvOFmPcnZ2MTf65Zua+2DzB9MqqXuO /es/languages/scss.js
sha384-WMy5VYgOMFAnHhPJXVDCQ/Y/QPlUrBqNVPtFH6/gGg2F4uaAowyQ0y/9zWEeGpJe /es/languages/scss.min.js
sha384-1mmBZmAs44b6FtD9wpMiLJa8bLZgZv9xoAhngN6B5Q22y9CtcsU2lat0zlRtyVgy /es/languages/shell.js
sha384-u9PV7oWG/lZlm+GnftX7kn0w4b8rRfFxSv5SmJJPHWKGI03rz6VLqgZdQ1B5ez6b /es/languages/shell.min.js
sha384-PNujUMly7HbeO9305dfzt3Yey7Bs4cx8IxXK4YiBp3k7XF1fi10TzTOfiAkYJiKm /es/languages/smali.js
sha384-O0Inb820+EuZH82ASj7FVKYAmXRz+AzJ5zradHpgFEewAMxQ5xU85u2LjzhtQDho /es/languages/smali.min.js
sha384-s1ZfN6xtlNKAZux8QYAG7upUsit3RwK5XDoCAN3g6Kj33RrIqbmkuGjdNF9RvzPM /es/languages/sql.js
sha384-y25cn06synxhYnlKVprZdpakuFWVrm2jvn8pqiF4L85a05CI/6bNeT2+qXbUYIyW /es/languages/sql.min.js
sha384-sfRYvVvcwsysqkDUscQ/SqsFOSvNGkGX5vm/yKMHdTwTd7A++Pqx1QpJK0bGebPD /es/languages/swift.js
sha384-9NAaCxdhTO7TX6fYeUHyt+NC3ledirZOADyWdinDCTN1taeqj8sLLYqjE8YMf4Na /es/languages/swift.min.js
sha384-Z61gsCS2W7Q+3fT1fdya/Sz4wlmsotT9iEGzgIlNqP0soaKH1NzysutxWp08Hh3E /es/languages/typescript.js
sha384-Tv4mr9B7b+x2IynRXW/xcAxUj1+AoN9zyp0n9BWE1Nle3Zfm/zUeEztNLhIRjgE7 /es/languages/typescript.min.js
sha384-82eHXc3kQTsEJ65AcO2c8eVqB9ynJzosSiMwdPYwt5oNRVsMKuxWoWkO5KFekVYB /es/languages/wasm.js
sha384-YBbT3eXpwj5Ddx0MS774iycYICw4gZ1Rs1ExYGIdcYC4EJhaWsfd9uNlaJZBuDaa /es/languages/wasm.min.js
sha384-SlI/W+G8uWNUJSAK5aQ6qG6L1vCJfzBIj4n7pmxtlQLBONfh4nqlvapD4XN3obTG /es/languages/x86asm.js
sha384-6jCvxwz6+4SETxn2V7LPLbyOa80MAobeFcGMoSk3ZR25GKcQQdZierMKqC5XdM+6 /es/languages/x86asm.min.js
sha384-9ECFzM+oWDye4s/MFx3QUXGo4mW43+SyLpWUDeQtWup6GZJ+KHFxVS89PmZt/fzl /es/languages/xml.js
sha384-PQrsaWeWrBiE1CFRw8K335CaJuQRTjDGm73vn8bXvlwaw6RyqWObdvMTBS8B75NN /es/languages/xml.min.js
sha384-7HTgKp/l2rzlyrh5vUfbfZVy+Wx1lKO4iGmfqvakienApv21u55lo+Vi+iVg4jY0 /es/languages/yaml.js
sha384-4smueUtgWTorlNLbaQIawnVCcIAuw82NetPOGWN5PbZT/pMr0rjvZXj0EUzJV1nr /es/languages/yaml.min.js
sha384-XT+FJnkeVMyPJtEnRHV5fSSEZKUBU/cxtMubIfX3kp4Mi61Wqi6HOM8k+hENfAP4 /languages/abnf.js
sha384-jLwoy3boLGElFnKGf70oE0qXwrxIal1KEKum645ymEqUpJVFKAccrMhO0Mfn93LI /languages/abnf.min.js
sha384-suZoQknnQ0DBASFb5XFnOEH5yo/3puJ8QB7Si5imwbDpwqTHUE97sax+2gSz1y5Y /languages/arduino.js
sha384-Fh/jSSfDM8TBxrEe/yPhSI9FpoMT/3TL5ib1pmehS1cHspQ9SWRYbUSW5QCCbI56 /languages/arduino.min.js
sha384-DVgpC7gq7q7xG60rHELREbS+6yY4WhS1l7rj8CI6vyssN09sF/sdVWirTMIEExiy /languages/awk.js
sha384-Btfrp4G+gSmAkx2oUvKfCWME0NWD3FQvtn+XCF14ANrDIH8IMswR2fHsSw71+04g /languages/awk.min.js
sha384-Jrkpn2hK0TY04skYBXB9fj7mMpKYy7g726cPwXGXf6mdBXnFlTDXFduxikMCRXT7 /languages/bash.js
sha384-BbT8tZtvkh8HPXIvL5RtzuljBwI3gR5KIdYxZyYSyI5C/+KNAGdzAiexvmxuroag /languages/bash.min.js
sha384-KsRYJ1vDhHJs5Jaf5t7cKJ6MEFtZ0pAwWlQp8GsaxHK2wZryLGV/AUCHcxVwXWKZ /languages/bnf.js
sha384-/ZwoIxhhRAm/U5bNbOz9XQDSWX9gGoo9xZ/sHuQCn2I1JATvXaWmdTJ+dGyKKs28 /languages/bnf.min.js
sha384-lAz0Eyld5DmFJB7cxaZonrkUJzGefh+K3niV5d7+vzzS7/P7FEeCJeLNXzMjeo+N /languages/c.js
sha384-tMmX0hBMZeMrZhX6dUNxA94/DNJLl70ao6qu2N9+b/6Ep9Y2e1pBzVjxtLygIB+d /languages/c.min.js
sha384-Z5Ja/rxBluJ4iPYwJYn2numfw2XFmlp3qLL1aJ1SZqyTjKWwMh9yWfpNCOqf3vAm /languages/cpp.js
sha384-B711MHXDqRvH/pKkxJk84RyRt9g0qyAJFsu2XukZKoCdnEiBmA6Aq9fO23ZCS7qk /languages/cpp.min.js
sha384-bsb3QmLtUiyaiHwtrL4YoAVI9yLsjyqxgoAsk4Zd+ass9rSK1WWRiCDSu/hm8QRp /languages/css.js
sha384-0XGvxIU7Oq1DQMMBr1ORiozzBq3KpZPE/74mJysWRBAop1dZ9Ioq/qRWe8u30Ded /languages/css.min.js
sha384-UZBiDq19/Pu+BEZTOdnKdnew0sCWKFa2EmtRr9O+ZndYF1NgJOlya5bua3Wf++BW /languages/diff.js
sha384-04MxX6iQ0WrwX6Df4GJWGCXwfr5hVS5CQ0r9CS7aunho7Fkj/AAWbEPU8a6G+4LA /languages/diff.min.js
sha384-JAYZMDzuElX+Ic47jwB+qzCzyKkmmEffC3mBnYYrJp2BlRjSorjliOzKSAG8KKTt /languages/django.js
sha384-krxOUFgiyevtYl4SsL416jqrUPU3K9W6fDe/TRvWeXwLYKWKq/f+XHL2AHwGYswO /languages/django.min.js
sha384-PF6NlDjoIfHgP6/hbKDRAswvI+dXitquVNX3GAJapyiu+AcQcdicRXJjIp8bj6pM /languages/dockerfile.js
sha384-hly+Rz036+A3/domxShxHoja13X3lfx8nyG3V8aMeOe7Efwu6gUaSrDxq9BKwYk4 /languages/dockerfile.min.js
sha384-nCQHycH/dxKl1rj/TOgVamoFxnEUD6CIFs0EyvFDXIwKlhUnW68pbHAEkH1R5AYD /languages/ebnf.js
sha384-h+bHwQb+0wBE5seu/NF0fQC12p4bXHOqEgC++5HuL49ZpDj4Rs+sfAVnQwjrcrsP /languages/ebnf.min.js
sha384-LGEW2yNxgENy35/TFa2DmM11QU/stRuw69epbr0GP5zvUbi7ddUFMeW6UB45yF0P /languages/glsl.js
sha384-55RCrjtjoduGgxOrAm5xxwlpSaef1T4sAUbyj0QiAl246lH+ZlanDaelryeGI/yO /languages/glsl.min.js
sha384-KozjmluVaBhceePeS2ewK9XRn41K/O5qJ2QF7Co0vZkgzKFNRqhvxLsHuA0eeUd3 /languages/gradle.js
sha384-U8+Z32JqO6yTfhn2BL/TN4GeoO3cFoOYjMig0J5mRgC9ZCQTIGOux3X80SPjqlQV /languages/gradle.min.js
sha384-holGv3Jxh0feei7zuLguIJKjzypduHsmDDdCBhga7QMeNaKp13q04M8fl/01idOa /languages/handlebars.js
sha384-iYbf8lXlprMiMUixdrRVRTObM8b+idJ8RuOJQkOddWFt9Ntk9xzMFSswSGaDHMNu /languages/handlebars.min.js
sha384-hV7ok3wrc7DrjvcAtn3jI6KlZtpbm+hC4HXrOyRjrl65HjGtTJ5ixGiMSpJRDiDq /languages/http.js
sha384-X50fiL5mByDvJRwn0hkUXIEttF5t8hlEFSPUMq42KoryxgI4niflBsviuhahhWJf /languages/http.min.js
sha384-Dprg6CdFFkimxaHg7qM7njVaWLMlOLqughixPERBDbm0cHdX6rKujTnJReof8O6m /languages/java.js
sha384-e+59xEZvRMXSRGD31B3HOBGAGqhhs+bbkxCqPuJDkSX5QGneIGTIfwdYJckTN3AO /languages/java.min.js
sha384-yxv7Fv9ToggiLsR67t98hV5ZRup6XX6xL1Rkbi/cGV5J8y7fosCi9POqlBkiBWFg /languages/javascript.js
sha384-tPOrIubtDHoQU7Rqw0o88ilthGO0/4xEZGB47XrQKWhrc1/SchwsDx+AP74u4nk0 /languages/javascript.min.js
sha384-pUlqdjoNePvHvdi7GVKJJnh/P2T3EvXXodl5j0JtTkbNC4DRH7gwGbcHFa84bFOP /languages/json.js
sha384-3C+cPClJZgjKFYAb0bh35D7im2jasLzgk9eRix3t1c5pk1+x6b+bHghWcdrKwIo3 /languages/json.min.js
sha384-vIyPs+G4S+ut5NV5tBIN5/E17wBiWbTTkFPPFbBC+r/FZOD95/fbcSzzeo00bE3x /languages/kotlin.js
sha384-7abn027YsNDPFilpW9aLlNUanPrq7Ht81zKQL9MKQq6/nkKrLczChRK5OA8GSKep /languages/kotlin.min.js
sha384-gC1LLqQxzTtslF1/nhSmFhIyScy7u0VnfVPDE45XlK+Ed/wgeOK0zae/DRDGNTDs /languages/latex.js
sha384-A8E38+eenPg19mMk5Ikv1fetaPL/yA2OsGR3hFs9TeeBX+zQ8u5bZNsPKmlFHwN4 /languages/latex.min.js
sha384-d0udVFqKcGL9t4V4uWX4gZjFdP1Pm0e8KKzoUrLUmuCUsolZkWSvoCT0UNN1Gcx3 /languages/llvm.js
sha384-H3eqxK8Ve23Rhvh2PBwboAibXmhLmgY2eTAg/ECOtrg8Z3vgwwHzLkhrc8m+jQtn /languages/llvm.min.js
sha384-IQZHDTDQQ0zpXf1FfEYOFIfjZrBbLbNXYCn4zukU6u9mLf6JI36vvIRaV6/d175T /languages/lua.js
sha384-dbTI+BVfiAlIfjWMYrH83f/x/GYSKbujaX4g4F7q5YxbGtlS7qTLcwBQQvDdsGf6 /languages/lua.min.js
sha384-Sk9XW/OOutdl6KS1M9Wson0imuqr0LkpoTRDHi5QFH4MWe0aViI5d86BOVkh8Ds0 /languages/markdown.js
sha384-Rv26WbhHH4MDPzeExq4ECmZUYF942tlfVhqA91Drw1P+Ey55KjihLF9RJENxjWr1 /languages/markdown.min.js
sha384-6yimxEGm9AwY562ggpE8Y+JOP2k/CzmRiB1LCQYpXYotigZw0zrOZy16v63xHMv6 /languages/nginx.js
sha384-CppArOy5YFkx1rJ0ZUWNnkF+CAV5OO9pHj3Fk7Kox4p/9H581UDmEck1buzehnjF /languages/nginx.min.js
sha384-IBSZGeRgNEOG3+t3RE0uLeiV5QFOYfL/ONCRpBLMGvnBClAUhNUUmYdY8bLXnFUw /languages/properties.js
sha384-Hw+JDJl3BaJE0DQ2qZUhbHrTi4UQ/je7PqMHPNfThOlI71MLMj8jRMr+wB0Fa9LS /languages/properties.min.js
sha384-E/f3XoO0xXgO3ViuyBrcnU1vPIm7mj6sxhiHxjINCMOJRApEZMvz5w7mqwcklOwU /languages/protobuf.js
sha384-hzilYICGbCQxAqe/4prYVmbugDPsbivG09sWqiOZ2ryCU2a+lkd4F+kJKSS5vRbT /languages/protobuf.min.js
sha384-ueSSFZFqg7cVD0dpEqIk9EefJiJUYan0PH6I8u/p+bNLLx7dMs4J2keMaFXqCN8P /languages/python.js
sha384-eXRt+aAa2ig1yFVDQCLis8k9s/1dikTcigj+/R07yNdIxc8BAG/b1uHDyEW3of17 /languages/python.min.js
sha384-4hMItQrXDnquJWRbDiZ+cP4udu1pcJlCVFg3Ytv9OgWNbpIwzizsWbIwzA1BAJrI /languages/rust.js
sha384-kENps59cKQW5DV3vOEzpSp6tfGzWGpPYKz748i4gGziVSjieRtupNNu/WEwG3s8n /languages/rust.min.js
sha384-e5MJZgawCv4c+BexmFUMVQU6dLcIOXdieG/a1FPCIgnlGfBIEUUcFMMo+UrKMOtN /languages/scss.js
sha384-BYdYy4D3IX6eNNlKqsviUjxC6EqavvNwCVDMzmie3QXyArWdCQf+VvvFo4ciaNaW /languages/scss.min.js
sha384-BanM6jNzM3hgNw0Vu3gSe58a3MK3PSlMUzh5s8QaaDzIvTWgB0jNetV3rNxteKHy /languages/shell.js
sha384-mSZF08WaP0Llc4GMwE0KA2V9yfZQimO5PvfcXf2AATDdqri3Q7IdV7pfbhVPJCHV /languages/shell.min.js
sha384-HFLfyJiO+lBUM21kqb1b65qouJvQhlZYo2pi75ReJvNJud2SY6PhEUf3Kt72KPHS /languages/smali.js
sha384-2GrZ6a8N5i11PDfuj2MDvHVQppLDRwjSg1ns22QcwXe/xCliQwFwKItwovpu4w/M /languages/smali.min.js
sha384-2sXmcW3eKeNDWiLtuq9NgFJC4NsLBN/fDTzZevmcgBrSERv6iO/k+c7r9T09Fb8J /languages/sql.js
sha384-jrnLoVn13sB+/dTfoAYVPhg0tYGQzzuzSGP3WTk8OvKAY0hDejpUXFYYI3bohAyW /languages/sql.min.js
sha384-+juhAXbxlgltos7eNuzta0Y7hfKqGQftMcEEStYqBJftSEdIiLd/FaviI8hs4d86 /languages/swift.js
sha384-CCauhmYx0fwWViYO6uiTII5shLTfiY/OzxKmLRTeCp8Ok81I2nXZS2Gb9lJVOSPC /languages/swift.min.js
sha384-8v3YMaXFO9cmTNxsHWqwn9wJsV1jVO7rwx4huxqlEQpT/P2tuDbtm+Hs0EdYqu0a /languages/typescript.js
sha384-df1w1nJ43GNwmgbSCrT8YFIYyqFAm+lzj+b6ofuziX8Cfdg9QHFwbORDgAaj//wi /languages/typescript.min.js
sha384-TCN/hvup/XKpDtGmR/RyK6NSG247wkNROUpO2sAoJuwpMvcr4KP9HA+K5L2rvOKg /languages/wasm.js
sha384-J3pUKFGnHJH0czAle+lKF96F/08caYKJfTEzlt5dGbGTR9M4BwOeOqAgvSzsjOsP /languages/wasm.min.js
sha384-84n3ZSWWJWOuj+nQr6fRxTWhQzXtn0OxWyGL/59PeLhK/0Ii3XgZD9oMInf7+bCW /languages/x86asm.js
sha384-d1w6as9peRTJh7Tgj50482oZIrj0+1guPVjy1QRfEafPvwMu6JZ/J9CiS5cT8XE9 /languages/x86asm.min.js
sha384-Pgzg6a405W6U1xFjjSs5i8d7V81Tmt/TYn8HFOa+u1psDc8cbs8nC7BuyNXbWWRK /languages/xml.js
sha384-FQjSArDMJE4WMAJGcCNAV+IXIOljcIxM3UFAD2vxjedWmBnnDaAyqRG7AQHf/uM/ /languages/xml.min.js
sha384-6GXi9L5BnOWPU6bzwYL78Zscp23qyDdMLZpZvp4mLzvF2qt0eY/DfsPHiFVXq4hv /languages/yaml.js
sha384-A/iMReLA0Bo3tLydBIoOQXQzYnrwL90jkHYUubrtERUGCbIuU7U0EHge0Xd2s5sr /languages/yaml.min.js
sha384-jcgDz163PrXXyd5wRYfVfvmL8StdFp2BeyVNXQroNEFt366K07bYBCObgFWiVs6j /highlight.js
sha384-x306znikU1nJ/fquC9V49RZkjjIyBpLM1NaJEUBsdWl9ovp3WQtiN/RHai8nnWah /highlight.min.js
```

