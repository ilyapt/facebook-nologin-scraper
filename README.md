# facebook-nologin-scraper

These are node.js module and program for scrape and parse basic profile info from open facebook profile without login or any api tokens. If you can see profile page in browser without entering on facebook then you can scrape this profile to JSON.

This well solution for mass scraping, I had experience to get facebook pages with this module at a rate up to 100,000 profiles per hour via [200 private ipv6 proxies](https://proxy6.net/en/?r=355). Any scrapers based on the graph api would be banned from Facebook with such ratio.

### How to use as program
_(for example scrape Mark Zuckerberg's profile)_

``node bin/facebook-nologin-scraper.js https://www.facebook.com/zuck``


### How to use as node.js module

``npm install facebook-nologin-scraper``

and write simple script _(example also scrape profile of Mark Zuckerberg)_
```JavaScript
var request = require('request');
var scraper = require('facebook-nologin-scraper').default;

request('https://www.facebook.com/zuck',
  {
    headers: {
      'user-agent': 'curl/7.47.0',
      'accept-language': 'en-US,en',
      'accept': '*/*'
    }
  }, function (error, response, body) {
    if (error) {
      throw (error);
    }
    if (response.statusCode === 200) {
      var result = scraper(body);
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('HTTP Error: ' + response.statusCode);
    }
});
```

### Script's result

```JSON
{
  "name": "Mark Zuckerberg",
  "link": "https://www.facebook.com/zuck",
  "avatar": "https://scontent.xx.fbcdn.net/v/t1.0-1/p160x160/12208495_10102454385528521_4749095086285673716_n.jpg?oh=1db98ec6477fa1f226e0ec23bc8ba235&oe=58B82B03",
  "eduwork": [
    {
      "section": "work",
      "text": "Work",
      "items": [
        {
          "url": "https://www.facebook.com/chanzuckerberginitiative/",
          "caption": "Chan Zuckerberg Initiative",
          "text": [
            "December 1, 2015 to present"
          ]
        },
        {
          "url": "https://www.facebook.com/facebook/",
          "caption": "Facebook",
          "text": [
            "Founder and CEO",
            "February 4, 2004 to present",
            "Palo Alto, California"
          ],
          "additional": [
            "Making the world more open and connected."
          ]
        }
      ]
    },
    {
      "section": "edu",
      "text": "Education",
      "items": [
        {
          "url": "https://www.facebook.com/Harvard/",
          "caption": "Harvard University",
          "text": [
            "Sep 2002 to May 2004",
            "Computer Science",
            "Psychology",
            "Cambridge, Massachusetts"
          ]
        },
        {
          "url": "https://www.facebook.com/pages/Phillips-Exeter-Academy/108366532520435",
          "caption": "Phillips Exeter Academy",
          "text": [
            "Class of 2002",
            "Classics",
            "Exeter, New Hampshire"
          ]
        },
        {
          "url": "https://www.facebook.com/pages/Ardsley-High-School/107668489256529",
          "caption": "Ardsley High School",
          "text": [
            "Sep 1998 to Jun 2000",
            "Ardsley, New York"
          ]
        }
      ]
    }
  ],
  "hometown": [
    {
      "caption": "Current City and Hometown",
      "items": [
        {
          "text": "Palo Alto, California",
          "url": "https://www.facebook.com/pages/Palo-Alto-California/104022926303756",
          "type": "Current city"
        },
        {
          "text": "Dobbs Ferry, New York",
          "url": "https://www.facebook.com/pages/Dobbs-Ferry-New-York/105506396148790",
          "type": "Hometown"
        }
      ]
    }
  ],
  "bio": {
    "caption": "About Mark",
    "text": "I'm trying to make the world a more open place."
  },
  "contact": [
    {
      "section": "Facebook",
      "urls": [
        {
          "url": "https://www.facebook.com/zuck",
          "text": "http://facebook.com/zuck"
        }
      ]
    }
  ],
  "favorites": [
    {
      "label": "Music",
      "url": "https://www.facebook.com/lcdsoundsystem/",
      "text": "LCD Soundsystem"
    },
    {
      "label": "Books",
      "url": "https://www.facebook.com/PlatoAuthor/",
      "text": "Plato"
    },
    {
      "label": "Movies",
      "url": "https://www.facebook.com/DisneyPixar/",
      "text": "Disney Pixar"
    },
    {
      "label": "Television",
      "url": "https://www.facebook.com/TheWestWingTVShow/",
      "text": "The West Wing"
    },
    {
      "label": "Athletes",
      "url": "https://www.facebook.com/samyrlaine/",
      "text": "Samyr Laine"
    },
    {
      "label": "Sports Teams",
      "url": "https://www.facebook.com/pages/Yankees/116174408393207",
      "text": "Yankees"
    },
    {
      "label": "Sports",
      "url": "https://www.facebook.com/pages/Fencing/112597985421493",
      "text": "Fencing"
    },
    {
      "label": "Activities",
      "url": "https://www.facebook.com/pages/Two-Cathedrals/144599888887930",
      "text": "Two Cathedrals"
    },
    {
      "label": "Interests",
      "url": "https://www.facebook.com/pages/Chicken-McNuggets/107600475936054",
      "text": "Chicken McNuggets"
    },
    {
      "label": "Other",
      "items": [
        {
          "url": "https://www.facebook.com/Lotus-Thai-Bistro-107129855989315/",
          "text": "Lotus Thai Bistro"
        },
        {
          "url": "https://www.facebook.com/beast.the.dog/",
          "text": "Beast"
        },
        {
          "url": "https://www.facebook.com/cesar.millan/",
          "text": "Cesar Millan"
        },
        {
          "url": "https://www.facebook.com/Palo-Alto-Sol-Restaurant-106887459349342/",
          "text": "Palo Alto Sol Restaurant"
        },
        {
          "url": "https://www.facebook.com/civ/",
          "text": "Sid Meier’s Civilization"
        },
        {
          "url": "https://www.facebook.com/pages/Steve-Jobs/113529011990795",
          "text": "Steve Jobs"
        },
        {
          "url": "https://www.facebook.com/pages/Andy-Samberg/108240575863415",
          "text": "Andy Samberg"
        },
        {
          "url": "https://www.facebook.com/Techmeme/",
          "text": "Techmeme"
        },
        {
          "url": "https://www.facebook.com/Auggie-208040285929031/",
          "text": "Auggie"
        },
        {
          "url": "https://www.facebook.com/Edgewood-141829545924351/",
          "text": "Edgewood"
        },
        {
          "url": "https://www.facebook.com/georgehtakei/",
          "text": "George Takei"
        },
        {
          "url": "https://www.facebook.com/Kirkland-House-215516670702/",
          "text": "Kirkland House"
        },
        {
          "url": "https://www.facebook.com/techinsider/",
          "text": "Tech Insider"
        },
        {
          "url": "https://www.facebook.com/burdickchocolate/",
          "text": "L.A. Burdick Chocolate"
        },
        {
          "url": "https://www.facebook.com/Jokowi/",
          "text": "Presiden Joko Widodo"
        },
        {
          "url": "https://www.facebook.com/McDonalds/",
          "text": "McDonald's"
        },
        {
          "url": "https://www.facebook.com/VW/",
          "text": "Volkswagen"
        },
        {
          "url": "https://www.facebook.com/solrestaurant/",
          "text": "Sol at F.B."
        },
        {
          "url": "https://www.facebook.com/govchristie/",
          "text": "Chris Christie"
        },
        {
          "url": "https://www.facebook.com/FacebookApps/",
          "text": "Facebook Games"
        },
        {
          "url": "https://www.facebook.com/innout/",
          "text": "In-N-Out Burger"
        },
        {
          "url": "https://www.facebook.com/pages/Schaubs-Meat-Fish-Poultry/116753901719789",
          "text": "Schaub's Meat Fish & Poultry"
        },
        {
          "url": "https://www.facebook.com/Garden-Fresh-Palo-Alto-112879318727818/",
          "text": "Garden Fresh, Palo Alto"
        },
        {
          "url": "https://www.facebook.com/corybooker/",
          "text": "Cory Booker"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Ft2fb.paulisageek.com%2Fmcslee&h=ATPsbcw_MGAA-kqloWmKYbQWkG20Ot5Z5lOYFPeQJRX-mKEqYu2EmZeyWFVtRMPfN0ggHpJVp0CQnrAHJbCNzwdzSrUhPK5Dd2XTSGLRT1TD70OaIUzF9iM9znQ5WQ0&s=1",
          "text": "Mark Slee"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Fopengraphprotocol.org%2F&h=ATNpEBj5XyUcf_iXQS3030BvphcL57E8BbuBT2FY6TNEkWELOYBjAD9o8kF9AYnTsghtR0zATdvM3TORp8B5uLewXQ-wEvnd11S3CiKnRbCON_kzKO1VVVQ1F1Y8R14&s=1",
          "text": "Open Graph Protocol"
        },
        {
          "url": "https://www.facebook.com/wikipedia/",
          "text": "Wikipedia"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.yelp.com%2Fbiz%2FGGRNKW_iTgQD6zWrDlDc-g&h=ATP6JVpeIYnc3AdFBbNKlgQzf0DNsZYLL2QsIS4HjnmyqtvNJH5AInILQ2ttPnKuhQy78w4zWp4tL2gNxxFmUxLgbJlVF4r_T7Xm4mFpEkUvRrY0ZBo3BmEXjH2W84E&s=1",
          "text": "Taqueria La Bamba"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.yelp.com%2Fbiz%2Fv9d0Lx7-NiG8lVOWF2k0_w&h=ATM72YNKRVnAR4p0BsGaaMjBsy1C-RZkab3g1rrXeZN56fNF5ZRSszpjIhOqBy5K3a7VbaDPjKEfdkfigRmI4wpq2zlo4YSlFGWnnV313N_2cTgDpKfcTtRJFVLOE84&s=1",
          "text": "Palo Alto Sol"
        },
        {
          "url": "https://www.facebook.com/davemor1n/",
          "text": "Dave Morin"
        },
        {
          "url": "https://www.facebook.com/fukisushi/",
          "text": "Fuki Sushi"
        },
        {
          "url": "https://www.facebook.com/NeytiriAvatar/",
          "text": "Neytiri"
        },
        {
          "url": "https://www.facebook.com/RonConway/",
          "text": "Ron Conway"
        },
        {
          "url": "https://www.facebook.com/Jake-Sully-207006267881/",
          "text": "Jake Sully"
        },
        {
          "url": "https://www.facebook.com/I-stay-longer-in-the-shower-because-the-water-is-so-warm-114439294989/",
          "text": "I stay longer in the shower because the water is so warm"
        },
        {
          "url": "https://www.facebook.com/HarvardCS/",
          "text": "Harvard Computer Science"
        },
        {
          "url": "https://www.facebook.com/gameday2009/",
          "text": "Game Day 2009"
        },
        {
          "url": "https://www.facebook.com/settlersofcatan/",
          "text": "Catan"
        },
        {
          "url": "https://www.facebook.com/BlowfishSushi/",
          "text": "Blowfish Sushi"
        },
        {
          "url": "https://www.facebook.com/fbsitegovernance/",
          "text": "Facebook Site Governance"
        },
        {
          "url": "https://www.facebook.com/gary/",
          "text": "Gary Vaynerchuk"
        },
        {
          "url": "https://www.facebook.com/painlessdrz/",
          "text": "Edward Zuckerberg, D.D.S.,F.A.G.D."
        },
        {
          "url": "https://www.facebook.com/Zhang-Yimou-14187440209/",
          "text": "Zhang Yimou"
        },
        {
          "url": "https://www.facebook.com/Thrift-12494336006/",
          "text": "Thrift"
        },
        {
          "url": "https://www.facebook.com/Amazon/",
          "text": "Amazon.com"
        },
        {
          "url": "https://www.facebook.com/goldeneye64/",
          "text": "GoldenEye 64"
        },
        {
          "url": "https://www.facebook.com/285-Hamilton-7853909012/",
          "text": "285 Hamilton"
        },
        {
          "url": "https://www.facebook.com/nicolassarkozy/",
          "text": "Nicolas Sarkozy"
        },
        {
          "url": "https://www.facebook.com/OfficialTrevorNoah/",
          "text": "Trevor Noah"
        },
        {
          "url": "https://www.facebook.com/JimBreyerVC/",
          "text": "Jim Breyer"
        },
        {
          "url": "https://www.facebook.com/mittromney/",
          "text": "Mitt Romney"
        },
        {
          "url": "https://www.facebook.com/paulryanwi/",
          "text": "Paul Ryan"
        },
        {
          "url": "https://www.facebook.com/TomiLahren/",
          "text": "Tomi Lahren"
        },
        {
          "url": "https://www.facebook.com/larrybrilliant/",
          "text": "Larry Brilliant"
        },
        {
          "url": "https://www.facebook.com/Cori-Bargmann-1248937111792452/",
          "text": "Cori Bargmann"
        },
        {
          "url": "https://www.facebook.com/czbiohub/",
          "text": "Biohub"
        },
        {
          "url": "https://www.facebook.com/MTV/",
          "text": "MTV"
        },
        {
          "url": "https://www.facebook.com/Ironmantri/",
          "text": "IRONMAN"
        },
        {
          "url": "https://www.facebook.com/timoreilly/",
          "text": "Tim O'Reilly"
        },
        {
          "url": "https://www.facebook.com/thisisandela/",
          "text": "Andela"
        },
        {
          "url": "https://www.facebook.com/leilajanah/",
          "text": "Leila Janah"
        },
        {
          "url": "https://www.facebook.com/michelleobama/",
          "text": "Michelle Obama"
        },
        {
          "url": "https://www.facebook.com/scobletechnology/",
          "text": "Robert Scoble \"Scobleizer\""
        },
        {
          "url": "https://www.facebook.com/HamiltonMusical/",
          "text": "Hamilton: An American Musical"
        },
        {
          "url": "https://www.facebook.com/joiito/",
          "text": "Joi Ito"
        },
        {
          "url": "https://www.facebook.com/zuckerbergeducationventures/",
          "text": "Zuckerberg Education Ventures"
        },
        {
          "url": "https://www.facebook.com/humansofnewyork/",
          "text": "Humans of New York"
        },
        {
          "url": "https://www.facebook.com/messenger/",
          "text": "Messenger"
        },
        {
          "url": "https://www.facebook.com/HowardHughesMed/",
          "text": "Howard Hughes Medical Institute"
        },
        {
          "url": "https://www.facebook.com/loic/",
          "text": "Loic Le Meur"
        },
        {
          "url": "https://www.facebook.com/chanzuckerberginitiative/",
          "text": "Chan Zuckerberg Initiative"
        },
        {
          "url": "https://www.facebook.com/Zuckerberg-San-Francisco-General-1718986274987675/",
          "text": "Zuckerberg San Francisco General"
        },
        {
          "url": "https://www.facebook.com/SFGHFoundation/",
          "text": "San Francisco General Hospital Foundation"
        },
        {
          "url": "https://www.facebook.com/BreakthroughPrize/",
          "text": "Breakthrough"
        },
        {
          "url": "https://www.facebook.com/potus/",
          "text": "President Obama"
        },
        {
          "url": "https://www.facebook.com/theprimaryschool/",
          "text": "The Primary School"
        },
        {
          "url": "https://www.facebook.com/xivisit/",
          "text": "Xi's Visit"
        },
        {
          "url": "https://www.facebook.com/SummitPS/",
          "text": "Summit Public Schools"
        },
        {
          "url": "https://www.facebook.com/businessinsider/",
          "text": "Business Insider"
        },
        {
          "url": "https://www.facebook.com/salon/",
          "text": "Salon"
        },
        {
          "url": "https://www.facebook.com/Vox/",
          "text": "Vox"
        },
        {
          "url": "https://www.facebook.com/Facebook-HQ-166793820034304/",
          "text": "Facebook HQ"
        },
        {
          "url": "https://www.facebook.com/NPR/",
          "text": "NPR"
        },
        {
          "url": "https://www.facebook.com/bighistoryproject/",
          "text": "Big History Project"
        },
        {
          "url": "https://www.facebook.com/traviskal/",
          "text": "Travis Kalanick"
        },
        {
          "url": "https://www.facebook.com/wired/",
          "text": "WIRED"
        },
        {
          "url": "https://www.facebook.com/DARPA/",
          "text": "Defense Advanced Research Projects Agency - DARPA"
        },
        {
          "url": "https://www.facebook.com/leamichele/",
          "text": "Lea Michele"
        },
        {
          "url": "https://www.facebook.com/iTunesUS/",
          "text": "iTunes"
        },
        {
          "url": "https://www.facebook.com/AltSchool/",
          "text": "AltSchool"
        },
        {
          "url": "https://www.facebook.com/eidolonjournal/",
          "text": "Eidolon"
        },
        {
          "url": "https://www.facebook.com/hillaryclinton/",
          "text": "Hillary Clinton"
        },
        {
          "url": "https://www.facebook.com/RecodeDotNet/",
          "text": "Recode"
        },
        {
          "url": "https://www.facebook.com/wsj/",
          "text": "The Wall Street Journal"
        },
        {
          "url": "https://www.facebook.com/vicenews/",
          "text": "VICE News"
        },
        {
          "url": "https://www.facebook.com/BenParr/",
          "text": "Ben Parr"
        },
        {
          "url": "https://www.facebook.com/WaltMossberg/",
          "text": "Walt Mossberg"
        },
        {
          "url": "https://www.facebook.com/gatesfoundation/",
          "text": "Bill & Melinda Gates Foundation"
        },
        {
          "url": "https://www.facebook.com/JMSantos.Presidente/",
          "text": "Juan Manuel Santos - Presidente"
        },
        {
          "url": "https://www.facebook.com/sethrogen/",
          "text": "Seth Rogen"
        },
        {
          "url": "https://www.facebook.com/JamesFranco/",
          "text": "James Franco"
        },
        {
          "url": "https://www.facebook.com/ayearofbooks/",
          "text": "A Year of Books"
        },
        {
          "url": "https://www.facebook.com/WhiteHouse/",
          "text": "The White House"
        },
        {
          "url": "https://www.facebook.com/qawithmark/",
          "text": "Q&A with Mark"
        },
        {
          "url": "https://www.facebook.com/treyratcliff/",
          "text": "Trey Ratcliff"
        },
        {
          "url": "https://www.facebook.com/FBAIResearch/",
          "text": "Facebook AI Research"
        },
        {
          "url": "https://www.facebook.com/ylecun/",
          "text": "Yann LeCun"
        },
        {
          "url": "https://www.facebook.com/pages/Tsinghua-University/111568985526707",
          "text": "Tsinghua University"
        },
        {
          "url": "https://www.facebook.com/msf.english/",
          "text": "Doctors Without Borders/ Médecins Sans Frontières (MSF)"
        },
        {
          "url": "https://www.facebook.com/nickbilton/",
          "text": "Nick Bilton"
        },
        {
          "url": "https://www.facebook.com/melindagates/",
          "text": "Melinda Gates"
        },
        {
          "url": "https://www.facebook.com/suedesmondhellmann/",
          "text": "Sue Desmond-Hellmann"
        },
        {
          "url": "https://www.facebook.com/relinquishment/",
          "text": "relinquishment.org"
        },
        {
          "url": "https://www.facebook.com/ezraklein/",
          "text": "Ezra Klein"
        },
        {
          "url": "https://www.facebook.com/dohatsutenPA/",
          "text": "Dohatsuten"
        },
        {
          "url": "https://www.facebook.com/petecashmore/",
          "text": "Pete Cashmore"
        },
        {
          "url": "https://www.facebook.com/IFeakingLoveScience/",
          "text": "I fucking love science"
        },
        {
          "url": "https://www.facebook.com/narendramodi/",
          "text": "Narendra Modi"
        },
        {
          "url": "https://www.facebook.com/jav/",
          "text": "Jose Antonio Vargas"
        },
        {
          "url": "https://www.facebook.com/FacebookRef/",
          "text": "Facebook Ref"
        },
        {
          "url": "https://www.facebook.com/GetSFMoving/",
          "text": "Nick Josefowitz"
        },
        {
          "url": "https://www.facebook.com/SenatorRandPaul/",
          "text": "Senator Rand Paul"
        },
        {
          "url": "https://www.facebook.com/RandPaul/",
          "text": "Rand Paul"
        },
        {
          "url": "https://www.facebook.com/MarcoRubio/",
          "text": "Marco Rubio"
        },
        {
          "url": "https://www.facebook.com/SenatorMarcoRubio/",
          "text": "Senator Marco Rubio"
        },
        {
          "url": "https://www.facebook.com/oculusvr/",
          "text": "Oculus"
        },
        {
          "url": "https://www.facebook.com/pages/Kirkland-House/107381882624348",
          "text": "Kirkland House"
        },
        {
          "url": "https://www.facebook.com/kristof/",
          "text": "Nicholas Kristof"
        },
        {
          "url": "https://www.facebook.com/Art-of-FB-165947396921770/",
          "text": "Art of FB"
        },
        {
          "url": "https://www.facebook.com/AriannaHuffington/",
          "text": "Arianna Huffington"
        },
        {
          "url": "https://www.facebook.com/BigGreenEgg/",
          "text": "Big Green Egg"
        },
        {
          "url": "https://www.facebook.com/dharmacomics/",
          "text": "Dharma Comics"
        },
        {
          "url": "https://www.facebook.com/fareedzakaria/",
          "text": "Fareed Zakaria"
        },
        {
          "url": "https://www.facebook.com/Internetdotorg/",
          "text": "Internet.org by Facebook"
        },
        {
          "url": "https://www.facebook.com/iTunes/",
          "text": "iTunes"
        },
        {
          "url": "https://www.facebook.com/PaloAltoPolice/",
          "text": "Palo Alto Police Department"
        },
        {
          "url": "https://www.facebook.com/VinDiesel/",
          "text": "Vin Diesel"
        },
        {
          "url": "https://www.facebook.com/pages/99-Ranch-Market/121707061211598",
          "text": "99 Ranch Market"
        },
        {
          "url": "https://www.facebook.com/99RanchMarket/",
          "text": "99 Ranch Market 大華超級市場"
        },
        {
          "url": "https://www.facebook.com/MPKFOX/",
          "text": "FB Fox"
        },
        {
          "url": "https://www.facebook.com/fwdus/",
          "text": "FWD.us"
        },
        {
          "url": "https://www.facebook.com/leanincommunity/",
          "text": "Lean In"
        },
        {
          "url": "https://www.facebook.com/davidsedaris/",
          "text": "David Sedaris"
        },
        {
          "url": "https://www.facebook.com/KariSaysNoTo/",
          "text": "Kari Says No To"
        },
        {
          "url": "https://www.facebook.com/La-Ciccia-93294686483/",
          "text": "La Ciccia"
        },
        {
          "url": "https://www.facebook.com/IDEO.org/",
          "text": "IDEO.org"
        },
        {
          "url": "https://www.facebook.com/FacebookStoriesEnglish/",
          "text": "Facebook Stories"
        },
        {
          "url": "https://www.facebook.com/themitik/",
          "text": "Mitik"
        },
        {
          "url": "https://www.facebook.com/SpaceX/",
          "text": "SpaceX"
        },
        {
          "url": "https://www.facebook.com/HackerSquare/",
          "text": "Hacker Square"
        },
        {
          "url": "https://www.facebook.com/DiannaAgronOfficial/",
          "text": "Dianna Agron"
        },
        {
          "url": "https://www.facebook.com/olympics/",
          "text": "Olympic"
        },
        {
          "url": "https://www.facebook.com/OliverWashingtonE/",
          "text": "Oliver"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.kickstarter.com%2Fprojects%2F260688528%2Fclang&h=ATMWZwDZ9DCybKdJK-jpd4-eAoI2YddqUylzdo9_b_RXHKrApoAybw5T_56YXDU9Hs6Sp-_H4G2lCrMRZsYe2PkDuACbHiEm3yPOZJMHCxGFtoHGMlKakMK1z6LxzXA&s=1",
          "text": "CLANG"
        },
        {
          "url": "https://www.facebook.com/WhatShouldWeCallMe/",
          "text": "What Should We Call Me?"
        },
        {
          "url": "https://www.facebook.com/pages/Casterly-Schrock/409026852450770",
          "text": "Casterly Schrock"
        },
        {
          "url": "https://www.facebook.com/sugarmountaintreats/",
          "text": "Sugar Mountain Treats"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Fopen.spotify.com%2Ftrack%2F0ngr6YFEU5y2RaYNYLqO9R&h=ATNaXgbnyN9AteakRBTOWgJT51Q9MHmBv-4Beeos3JtVqLx2j6-Em_1ZYny1Te3OQCoMbsoDQIyap3kNR86QAqLHvbuwf5_mNwoQljWWJ2S53WcqfIAAWnobFf57HHQ&s=1",
          "text": "The Show - Lenka"
        },
        {
          "url": "http://l.facebook.com/l.php?u=http%3A%2F%2Fopencompute.org%2F&h=ATMngJ97_RFfp5t0c3JAV1PaYYhda91FDChmIxSDvpxQlQqqMkdS6VscRRlg_42ypAe9KLL9eJtrt7j7ajImfVKmsVI4Ww07UgMK5VdcjwdxDbwx3R46MX7fF99w2mw&s=1",
          "text": "Open Compute Project"
        }
      ]
    }
  ]
}
```

# Problem of proxying

In 2020 there are some constrains in scraping from Facebook. Fortunately we can avoid them thanks to
proxies.

This libray do not take responsibility for proxy managing that can be elasticly adjusted to your requirements,
but we provide example of code that shows how to integrate it with proxy.

In our example we are using `axios` with `https-proxy-agent`.

There is test assuming that function `getProxy` returns new single proxy in format `http://${ip}:${port}`:

```

```

Below fragment of code for testing if your proxy hides your real location: 

```
import axios from 'axios';
import HttpsProxyAgent from "https-proxy-agent/dist/agent";

it('Proxy should be connected',async () => {
    const {data: withoutProxy} = await axios('https://ipinfo.io');
    expect(withoutProxy.city).toBe('THERE TYPE YOUR CITY');

    const {data: withProxy} = await axios('https://ipinfo.io', {
        proxy: false,
        httpsAgent: new HttpsProxyAgent(getProxy())
    });

    expect(withProxy.city).not.toBe('THERE TYPE YOUR CITY');
})
```
