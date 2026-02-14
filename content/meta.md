# this website is
<p class="github-only">
  <b>hi curious github user skimming through my page's source code</b>
  <br>
  this markdown document may not be displayed properly because i have added custom """formatting""" that regular or github markdown doesn't have
  <br>
  consider viewing this document on my github pages instead!
</p>

a culmination of my idiotic tendencies.\
inspired by [exa's digital garden](https://exa.y2k.diy/garden), [quat's digital garden](https://notes.highlysuspect.agency/garden.html) and [todepond's wikiblogarden](https://www.todepond.com/wikiblogarden),\
i thought i should start making one of my own!

the technology behind this site is... jank, for the lack of a better word.

the *"backend"* [-mutter (pffft)] of this webpage is literally just the github pages servers.\
it does nothing but serve static files, because that's what github pages does.

the *"frontend"* is where the magic truly happens.\
this page that you're seeing right here is actually the 404 page,\
**HOWEVER** i did some *witchcraft* with JavaScript to make it parse the current path and render the corresponding *"page"*,\
like a normal website would do!\
[-mutter (learned it from previous experience with weird path router wizardry like <a href="https://react.dev">react</a> and <a href="https://vuejs.org">vue</a> on github pages)]

the *"pages"* in question are mere markdown files pulled directly from the static file dump on this github pages instance, for example, [here's one!](/content/meta.md) it's this page itself.

well then how does the nav panel work you may ask?\
before uploading all of these files to the github pages instance,\
i made it write a list of files in the content folder that it should use as pages on the nav panel down into a json file through the use of a npm script.\
then, on the *"frontend"*, i just have the webpage pull that list using a fetch call, then add entries onto the nav panel accordingly.

does it all make sense yet?\
no?

> {dialogue} *evie, you know, there are better ways to make a website. like buying a vps, and then putting a real web server on there...*

oh yeah.\
you're right...\
i should have done that- i mean, i would have done that...\
if i wasn't [-angry so broke!]
it's not like, my family is [-angry struggling] to keep up with my college tuition or whatever...

moving on...

> {dialogue} *evie, even so, you know, there are better ways to make a static webpage... like generating html from markdown files or whatever...*

but that's ***no fun***, is it?\
my webpage would just be another *slop project*, with no [-rapid challenge] to it..\
besides, at least i feel compelled to *do something*! *to make something*! **for once**!

this webpage is my passion project. that just sounds so corny doesn't it.\
i've felt fun making this webpage. that's what matters, doesn't it?\
it's just fun, making something from nothing.

that's what matters. having fun.\
[-mutter <i>i've never felt so much fun in my life.</i>]