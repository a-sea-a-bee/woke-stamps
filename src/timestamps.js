const fs = require('fs');
// direct copy of data, until API access is obtained. 
// Needs to be manually cleaned up when updated
// this script parses the chat lines and outputs a JSON object
const data = `
DAY 51 - 20:00 PST - N/A - HORSES
Day 50 - 23:25 pst - N/A - cop riot
Day 51 - 21:08 PST - N/A - streamer Hiram arrested
Day 51 - 22:11 PST - N/A - fes cop riot fence in pdx
Day 51 - 01:40 PST - N/A - PDX Fed Riot
Day 51 - 02:14 PST - N/A - Drummer thrown to ground - Ground Level News
Day 51 - 02:28 PST - N/A - Driver runs red light in front of Portland Police
Day 52 - 21:30 PST - N/A - Driver pulls out a gun.  Protesters call drivers bluff.
Day 52 - 22:56 PST - N/A - Charge and violent arrests Portland
Day 53 - 21:50 PST - N/A - feds have guns pointed at momtifa around fence
Day 53 - 23:20 PST - N/A - feds pepper balls - Portland
Day 53 - 23:47 PST - N/A - Fence falls at courthouse - Portland
Day 53 - 00:08 PST - N/A - Protesters hold position at intersection
day 53 - 00:14 PST - N/A - 9 bangs
day 53 - 11:59 PST - N/A - cool dude grinds the fence with skateboard and lands that shit and it was so clean like holy like it was really cool and also people cheered
Day 54 - 20:35 PST - N/A - badass band playing in Colorado
Day 54 - 00:30 PST - N/A - feds light a tree on fire during tear gassing
Day 54 - 00:54 PST - N/A - feds shoot car window
Day 54 - 01:04 PST - N/A - feds throw gas grenade at ACLU observer (Halospace - Rosa)
Day 55 - 23:10 PST - N/A - Feds start gassing and shooting.
Day 55 - 00:30 PST - N/A - Portland - Feds tackle a protesters into fire and gas
Day 55 - 01:00 PST - N/A - Water Hydrant
Day 55 - 01:15 PST - N/A - epic drum line
Day 55 - 01:23 PST - N/A - Possible Car Snatchers
Day 55 - 01:45 PST - N/A - Wall comes down in front of courthouse. Fed Riot #3 starts.
Day 55 - 01:52 PST - N/A - Feds fills park outside of federal courthouse, as people try to sleep in tents
Day 55 - 01:53 PST - N/A - Smoke grenades being shot. Press being shot at. People are being arrested.
Day 55 - 01:53 PST - N/A - Riot ribs on fire
Day 56 - 22:00 PST - N/A - Ted Wheeler says "Black Lives Matter"
Day 56 - 22:25 PST - N/A - Spittin' truth at Ted.
Day 56 - 22:36 PST - N/A - Ted talks about PPB tear gassing
Day 56 - 23:05 PST - N/A - garbage fire
Day 56 - 23:07 PST - N/A - Man enters courtyard over fence
Day 56 - 23:15 PST - N/A - TED AT THE FENCE
Day 56 - 23:18 PST - N/A - Ted gets gassed
Day 56 - 23:22 PST - N/A - Ted shakes fence
Day 56 - 23:50 PST - N/A - Ted eats a ton of gas and has had enough
Day 57 - 00:33 PST - N/A - PPB declares riot
Day 57 - 03:00 PST - N/A - likely the last hurrah by feds in Portland for the night
Day 56 - 21:11 PST - N/A - Ted Wheeler enters the protest
Day 56 - 19:35 PST - N/A - Halospace Media - Jacques streams from the steps of the Justice Center in Portland, peaceful protesters exercising their freedom of speech and freedom to assemble.
Day 57 - 20:00 PST - N/A - Chicago cops have donned riot shields for no reason
Day 57 - 20:30 PST - N/A - getting intense in Beverly Hills CA, riot gun pointed at protesters head
Day 57 - 20:45 PST - N/A - looks like Beverly Hills cops have started arresting people protesting in the street one by one.
Day 57 - 22:45 PST - N/A - PDX - fire speech - Maisey? - waifupinx stream
Day 57 - 23:21 PST - N/A - moment of silence for those lost to police brutality. Portland (crowd size https://twitter.com/MrOlmos/status/1286519992649781248?s=20 )
Day 57 - 23:41 PST - N/A - first federal protective service warning. Portland
Day 57 - 23:51 PST - N/A - fence removal order clearly on the fence (top left) confirming this https://twitter.com/k_rambo_/status/1286460570858741760?s=20  https://twitter.com/TheRealCoryElia/status/1286584086056677377?s=20
Day 57 - 23:57 PST - N/A - fence rocked for first time
Day 58 - 00:25 PST - N/A - garbage fire inside fence. Portland
Day 58 - 00:29 PST - N/A - first fence jumper + few pepperballs
Day 58 - 00:33 PST - N/A - Chicago Columbus statue coming down (bottom right)
Day 58 - 00:34 PST - N/A - Portland first gas of night.
Day 58 - 00:41 PST - N/A - second gas of night close to doors tho
Day 58 - 00:48 PST - N/A - Feds storm out shooting and declare unlawful assembly for ????? https://clips.twitch.tv/BelovedBlushingShrewPicoMause https://twitter.com/MrOlmos/status/1286572332555755520?s=20 https://twitter.com/MrOlmos/status/1286573160775655424?s=20
Day 58 - 00:50 PST - N/A - Entire road in front of the federal building is covered in dense clouds of gas.
^ gas cloud https://clips.twitch.tv/MoralAwkwardKoupreyChefFrank
Day 58 - 00:57 PST - N/A - gas mostly cleared by leaf blowers
Day 58 - 01:10 PST - N/A - gas again.
Day 58 - 01:25 PST - N/A - feds outside fence to right of court house. fed rioting
^now clearing the street infront of court house
Day 58 - 01:28 PST - N/A - feds punch person right outside fence
^fence is broken
Day 58 - 01:35 PST - N/A - Large line of federal officers and local police officers sweep across the park in front of the federal building
Day 58 - 01:44 PST - N/A - huge gas cloud again, marching and shooting
Day 58 - 01:52 PST - N/A - feds retreat, tho continue to shoot and smoke from fence
Day 58 - 01:54 PST - N/A - tear gas tornado https://twitter.com/IwriteOK/status/1286585525365768193 https://www.youtube.com/watch?v=EvwP0ZqtBUc&feature=youtu.be
Day 58 - 02:08 PST - N/A - LRAD deployed for split second.
Day 58 - 02:18 PST - N/A - feds come back out to clear inside fence
Day 58 - 02:32 PST - N/A - fence banging continues, pepper balls and tear gas continue to be used
Day 58 - 02:35 PST - N/A - another fire inside fence
Day 58 - 02:45 PST - N/A - feds come back out and gas again....
Day 58 - 02:49 PST - N/A - holy pepper balls
Day 58 - N/A - N/A - feds were seen picking up spent munitions. not clear what for. https://www.youtube.com/watch?v=EvwP0ZqtBUc&feature=youtu.be
Day 58 - 03:30 PST - N/A - Protestor with flowers and others arrested by feds with  who then proceed to open fire on protestors w pepperballs at very close range
^ https://www.facebook.com/tre.stewart/videos/3099900623425751/
Day 58 - 13:30 PST - N/A - Riot Ribs Portland approached by feds with batons who then leave 5 minutes later
^https://twitter.com/riotribs/status/1286760678263406592?s=20
Day 58 - 13:55 PST - N/A - Louisville PD now clearing barricade and long dinner table and marching down street
Day 58 - 14:04 PST - N/A - Louisville Police have moved to kettle
Day 58 - 14:12 PST - N/A - Louisville Police are raiding and arresting (false alarm they appear to have just walk around the crowd) https://www.facebook.com/maxwellamitchell/videos/10219081523052595 then stream ended
Day 58 - 14:53 PST - N/A - Mass arrests have actually begun by Louisville Police (25 to 60 arrests not clear) https://twitter.com/HayesGardner/status/1286783475983450113?s=20 https://twitter.com/HayesGardner/status/1286788386095865862?s=20
Day 59 - 23:00 PST - N/A - first pepperballs out in Portland
Day 59 - 23:10 PST - N/A - first small round of tear gas in Portland (expect gas and pepperballs to contintue all night. will not stamp all unless they are big or a break between)
Day 59 - 23:23 PST - N/A - Unlawful assembly declared in Portland (no effect)
Day 59 - 20:35 PST - N/A - American flag taken from flag pole and burned in Atlanta GA (supposedly ICE/DHS building)
Day 59 - 23:37 PST - N/A - Unlawful assembly declared in Oakland CA after 2 protester peacefully cross barricade
Day 59 - 23:41 PST - N/A - Portland Feds retreat after being covered in paint https://twitter.com/IwriteOK/status/1287276794710618113?s=20 https://twitter.com/LCRWnews/status/1287276520268902401?s=20 https://twitter.com/tuckwoodstock/status/1287280775927226368?s=20
Day 59 - 23:55 PST - N/A - power tools used on Portland fence https://twitter.com/itsmikebivins/status/1287280283037741064?s=20 https://twitter.com/IwriteOK/status/1287282378184855553?s=20
Day 59 - 23:58 PST - N/A - talk of LRAD in Oakland
Day 60 - 00:19 PST - N/A - protesters flip police traffic sign in Oakland CA
Day 60 - 00:22 PST - N/A - police are charging in Oakland
Day 60 - 00:50 PST - N/A - fence rocking noted on the left side of court house (Tre Stewart stream) 
^https://twitter.com/PDocumentarians/status/1287300063601909761?s=20
Day 60 - 00:50 PST - N/A - small teargas in Portland first in a while
Day 59 - 01:03 PST - N/A - Fence goes down
Day 60 - 01:04 PST - N/A - the teargas and pepper balls and fireworks get intense
Day 60 - 01:16 PST - N/A - Unlawful assembly declared in Portland as the feds are being hit with projectiles+fence
Day 60 - 01:23 PST - N/A - Feds have left the courthouse the battle rages on. some arrests being made https://twitter.com/andrewkimmel/status/1287308350258962432?s=20
Day 60 - 01:27 PST - N/A - Black Zebra assaulted
Day 60 - 01:33 PST - N/A - Riot declared in portland
Day 60 - 01:55 PST - N/A - after a 5-10ish minute pause there is more tear gas and full auto pepperballs
Day 60 - 02:01 PST - N/A - Vietnam vet hounds feds and gets pepper sprayed (Mike Hastie born in 1945, army medic and bronze star recipient: unverified) https://twitter.com/andrewkimmel/status/1287319466120904704?s=20 and https://twitter.com/andrewkimmel/status/1287513674802802690?s=20
^not verified that this is him, but stuff does come up with that name that matches the story https://www.vietnamfulldisclosure.org/mike-hastie-photo-essay/ and https://www.counterpunch.org/2017/10/09/i-walked-pointless-in-vietnam/
DAY 60 - 04:05 PST - N/A - round of pepper spray and flash bangs and tear gas. One caught riot ribs on fire, but was put out by a protester and CJ https://youtu.be/5q8CCoCThxE
DAY 60 - 4:20 PST - N/A - Black man verbally confronts feds along a small group of protestors and media -- on Andrew Kimmel's stream
^https://twitter.com/andrewkimmel/status/1287379745152184329
DAY 60 - 05:24 PST - N/A - Feds toss more tear gas and fire some rubber bullets before finally heading back into the building.  https://youtu.be/5q8CCoCThxE
DAY 60 - 14:24 PST - N/A - large BLM protest in Los Angeles at West LA Federal building. Protesters are now blocking a intersection. https://www.facebook.com/pg/MarchAndRallyLA/posts/
^Josh Friedman https://www.youtube.com/watch?v=v_xwKYuOROo&feature=youtu.be
DAY 60 - 16:00 PST - N/A - large march in NYC https://www.facebook.com/dougwater/videos/3420440491340759/
DAY 60 - 18:22 PST - N/A - Event in Austin TX. MENTAL HEALTH WARNING. Ignorance is bliss Moment of silence for Garrett Foster at the vigil in Austin, TX. Garret was shot and killed during a BLM march yesterday.
DAY 60 - 19:10 PST - N/A - Car drives through protesters in DC (bike may have been run over, no injuries, car stopped by police)
Day 60 - 19:29 PST - N/A - shot may have been fired  in part infront of Justice center in portland https://www.facebook.com/vnn.live/videos/1450754281778781/
DAY 60 - 19:35 PST - N/A - Protesters in Seattle are constructing a barricade in the street with garbage bins and have formed a shield wall https://twitter.com/JoshuaPotash/status/1287588623639031808?s=20
DAY 60 - 20:15 PST - N/A - Portland Police enter the park near JC to arrest one person (not clear yet what for) https://twitter.com/itsmikebivins/status/1287589247868796928?s=20 and clip https://clips.twitch.tv/MotionlessDirtyScallionChefFrank
DAY 60 - 22:40 PST - N/A - Someone pulls gun and points it at protester in Eugene, OR
DAY 60 - 22:50 PST - N/A - ^idiot was arrested in Eugene
DAY 60 - 22:54 PST - N/A - protesters hitting the fence in Portland
DAY 60 - 23:05 PST - N/A - People have jumped the fence in Portland (may have just climbed the fence)
Day 60 - 22:17 PST - N/A - PPrB  (Portland Protest Bureau) begin their nightly Speech
Day 60 - 22:24 PST - N/A - "We made some things happen. We stopped in at Nike Today. We need as many of you to come to Nike tomorrow" - PPrB
Day 60 - 22:25 PST - N/A - "We love Nike" - PPrB
DAY 60 - N/A - Richmond, VA - Police arrest a member of the media.....for the second night in a row https://twitter.com/CopsRBad/status/1287626945216356352?s=20
^Richmond police also noted hand out summons to people in the hospital NSFW
^https://twitter.com/aliceironically/status/1287640135572631559?s=20
DAY 60 - 23:30 PST - Eugene, OR - Protesters in Eugene, OR shake fence around Eugene's jail https://twitter.com/RNGDave/status/1287635248260423680?s=20
Day 60 - 23:44 PST - N/A - nightly fireworks at Portland Federal courthouse begin
Day 61 - 00:03 PST - N/A - First warning by feds in Portland
Day 61 - 00:06 PST - N/A - Federal officers have exited the courthouse in Portland + first gas and pepper balls
Day 61 - 00:15 PST - N/A - Unlawful assembly declared in Portland
Day 61 - 00:24 PST - N/A - feds come back out strong after briefly going inside. Force everyone off the fence with riot rounds. This lasts about 2 minutes then they go inside (Portland)
Day 61 - 00:39 PST - N/A - Eugene PD warn protesters to not cross the sidewalk https://twitter.com/RNGDave/status/1287653762333474816?s=20
Day 61 - 00:45 PST - N/A - Eugene PD declare unlawful assembly followed by Eugene PD and protesters talking https://twitter.com/RNGDave/status/1287655032280686592?s=20 situation would end with protesters marching away at 01:07 PST
Day 61 - 00:57 PST - N/A - teargas out in Portland...again
^Molotov thrown ??? https://twitter.com/desertborder/status/1287659493870862338?s=20
Day 61 - 01:12 PST - N/A - Portland feds are in the street in front of fence though largely unarmed, few batons few riot guns (besides pistols)
Day 61 - 01:18 PST - N/A - flashbangs out, pepper balls out, street is cleared
Day 61 - 01:19 PST - N/A - violent arrest of female protester + several other arrests https://twitter.com/TheRealCoryElia/status/1287664107726938112?s=20
Day 61 - 01:19 PST - N/A - Fed points AR at protester
Day 60 - 01:24 PST - N/A - Violent Arrest of Protester - CR stream
Day 61 - 01:27 PST - N/A - general sweep begins (Portland)..... or not? actual push at 1:37pm
Day 61 - 01:40 PST - N/A - another violent arrest, man with leaf blower  https://twitter.com/desertborder/status/1287671461780418560?s=20 + https://twitter.com/teegeez123/status/1287669786982281218?s=20 (poor video)
Day 61 - 01:45 PST - N/A - Tear gas out for zero reason and holy pepper balls on both sides of park https://twitter.com/R3volutionDaddy/status/1287673305680420866?s=20
Day 61 - N/A - Feds noted to be confiscating's shields https://twitter.com/LadyHelpish/status/1287673181428359169?s=20
Day 61 - N/A - feds take picture of license plate https://twitter.com/MrOlmos/status/1287668974709116928?s=20
Day 61 - 02:05 PST - N/A - more tear gas then feds begin smokey retreat https://twitter.com/MrOlmos/status/1287681179143954433?s=20
Day 61 - 02:09 PST - N/A - over one minute of straight pepper balls + more tear gas
Day 60 - 02:16 PST - N/A - BlackZebra/Concrete and others form press line and march towards fed line - are met w/ gas, flashbangs, impact/pepper munitions https://clips.twitch.tv/CarelessEndearingMoonANELE
DAY 61 - 02:57 PST - N/A - protesters say "clean the park" and throw trash over the fence in Portland (Concrete reporting) https://www.youtube.com/watch?v=Hwnw9YAUCeA
^trash has been lit on fire
DAY 61 - 03:14 PST - N/A - single fed shooting pepper balls to hold off crowd while the fire is put out
DAY 61 - 03:20 PST - N/A - feds nearly light a car up on the stream with live ammo
Day 61 - 20:06 PST - Tempe, AZ - police have declared a unlawful assembly. arrest being mad
Day 61 - N/A - N/A - https://twitter.com/zerosum24/status/1287956458685030401?s=20
Day 61 - 20:38 PST - Tempe, AZ - police arrest man following their orders
Day 61 - 21:36 PST - Portland, OR - feds arrest someone who hops fence?
Day 61 - 21:47 PST - Portland, OR - feds make first announcement of the night (I missed it and most of the crowd did)
Day 61 - N/A - N/A - https://twitter.com/ProudBulba/status/1287972057867669505?s=20
Day 61 - 22:20 PST - Portland, OR - feds make second announcement and piss off crowd
Day 61 - 22:44 PST - Portland, OR -  first fireworks of the night (some fire crackers) https://twitter.com/TheHannahRay/status/1287989353445089280?s=20
Day 61 - 22:48 PST - Portland, OR - first shaking of fence
Day 61 - 23:00 PST - Portland, OR - small fire on fence in Portland https://twitter.com/teegeez123/status/1287998604112572416?s=20
Day 61 - 23:31 PST - Portland, OR - first pepper balls and tear gas + use hose to put fire out from a distance
Day 62 - 00:10 PST - N/A - something thrown at courthouse doors and explodes in flame (possible molotov) https://twitter.com/KittyLists/status/1288010434331648001?s=20 (poor view) + https://twitter.com/ShelbyTalcott/status/1288020625995395078?s=20 better view
Day 62 - 0:21 PST - N/A - come out with gas and pepper balls; flash bangs :23 and loud alarm
Day 62 - 0:34 PST - N/A - come out with more flash bangs and gas
Day 62 - 0:42 PST - N/A - Portland protest declared unlawful for no clear reason
Day 62 - 0:55 PST - N/A - Feds are on the street near Justice Center and marching  North toward crowd. teargas out, pepper balls out.  https://twitter.com/KittyLists/status/1288025080727924738?s=20 
^Second group of feds emerges from northside of courthouse. 
^One fed has a hockey stick. https://clips.twitch.tv/BadEndearingEchidnaArgieB8A 
^Single arrest is known to have been made https://twitter.com/KittyLists/status/1288025512376336390?s=20
Day 62 - 01:00 PST - N/A - the crowd of only a few hundred has has largely dispersed
Day 62 - 1:16 PST - N/A - feds retreat in Portland
^Please note for the second night in a row protesters notice something off about the tear gas. Feds are also lighting any one up that tries to pick up those canisters  GROSS several protesters have commented it is stronger and they started puking something not seen in the last 60 days of gas
DAY 62 - N/A - Attorney General William Barr testifies before house judiciary committee. We did learn that 3 Portland feds have been "blinded" by lasers, and some have been hit by pellet guns. With no more evidence to that.
DAY 62 - N/A - NYPD snatch protester off the street in unmarked van with undercover officers. https://nyti.ms/3g8K9eh https://twitter.com/MichelleLhooq/status/1288253381883113475?s=20 https://twitter.com/NYPDnews/status/1288270680614739968?s=20
DAY 62 - 18:00 PST - N/A - streamer Actual Intelligence harassed in NYC over streaming protest....for zero reason
Day 62 - 19:28 PST - N/A - Kshama Swanat gives speech in Seattle
DAY 62 - 19:40 PST - N/A - Confederate monument being removed from McDonough Square in Atlanta https://www.youtube.com/watch?v=7HnbyY4phoE&feature=youtu.be
DAY 62 - 20:10 PST - N/A - Seattle womans march starts. Large crowd tonight
Day 62 - 20:40 PST - N/A - Statue in Atlanta down
Day 62 - 20:50 PST - N/A - Epic Native American drum circle in Portland.
Day 62 - 21:16 PST - N/A - Portland feds come outside to hose off CS powder inside the fence
Day 62 - 21:23 PST - N/A - Wall Of Moms march arrives at Portland courthouse
Day 62 - 21:56 PST - N/A - Portland feds come out and go back inside (not clear why)
Day 62 - 22:04 PST - N/A - Portland feds give first fence warning (largely missed by crowd)
Day 62 - 22:10 PST - N/A - second Native America drum circle this time by Portland fence
Day 62 - 22:30 PST - N/A - first warning /announcment via loud speaker from Feds at Portland justice center
Day 62 - 22:50 - N/A - group unplugs mic on woman talking.
Day 62 - 22:50 - N/A - Woman gets shut down and drowned out by PPrB (portland Protest Beaurea)   When called out they leave. Again.
Day 62 - 23:00 - N/A - american flag set on fire
Day 62 - 23:00 PST - N/A - Feds announce warning for damaging fence, moving or jumping fence due to people banging on fence with traffic cones. 1 man jumps fence directly after https://www.youtube.com/watch?v=fbgzHGPJ0uU
Day 62 - 23:00 PST - N/A - Flash bangs in succession
Day 62 - 23:07 - N/A - Moms marching arms linked
Day 62 - 23:30 - N/A - announcement not to try to enter building
Day 62 - 23:43 PST - N/A - Dope freestyle
DAY 63 - 00:01 PDT - N/A - fire at former elk statue in Portland
DAY 63 - 00:11 PDT - N/A - person inside fence, pepper balls out (Portland)
DAY 63 - 00:15 PDT - N/A - feds are outside (Portland)
Day 63 - 22:51 PDT - N/A - more pepper balls fired in Denver, followed by a riot line pushing 50ft towards protesters and retreat. crowd still peaceful
Day 63 - 22:58 PST - N/A - Federal Protective Service using tear gas, fireworks at Portland Justice Center
^Federal Protective Service also threatened crowd control ammunitions to protect thy sacred fence, as usual.
Day 63 - 21:02 PDT - N/A - man in wheelchair talking to police riot line in Denver (lasts 6 minutes)
Day 63 - 21:10 PDT - N/A - Seattle woman's march leaders talk to city council member Andrew __.
Day 63 - 21:15 PDT - N/A - Denver police riot line disperses, police repair fence
Day 63 - 21:18 PDT - N/A - someone inside fence in Portland then leaves
Day 63 - 21:25 PST - N/A - Federal Protective Service using crowd control munitions in Portland again
^ they have come outside
Day 63 - 23:26 PST - N/A - Eric Greatwood gets hit by a flashbang.
Day 63 - 23:30 PST - N/A - Feds declare unlawful assembly in Portland.
Day 63 - 23:40 PST - N/A - Tear gas in Portland again
Day 63 - 23:40 PDT - N/A - Portland, OR - feds are seen using a pepper fogger/thermal fogger.  Prison guards call it a dragon.  https://twitter.com/dougbrown8/status/1288727075197657088?s=20 + https://www.nixalite.com/product/igeba-tf-35
Day 63 - 23:50 PDT - N/A - Portland Fed riot again, feds are in the park
Day 63 - 23:57 PDT - N/A - Portland protesters follow a lone fed outside the fence, but no one touches him (Teebs stream)   https://clips.twitch.tv/TangibleProtectiveBobaThisIsSparta
Day 64 - 00:05 PDT - N/A - Feds outside fence are using a strobe light
DAY 64 - 00:15 PDT - N/A - Portland, OR - protester arrested
DAY 64 - 00:20 PDT - N/A - Portland, OR - feds pull umbrella out of hand
DAY 64 - 00:23 PDT - N/A - some feds have retreated inside but they are all out moments later https://twitter.com/hungrybowtie/status/1288740230216835072?s=20
DAY 64 - 00:24 PDT - N/A - feds try and grab a protesters shield (Portland) https://twitter.com/EndSoundtrack/status/1288741205379956738?s=20
DAY 64 - 00:26 PDT - N/A - more pepperballs (Portland)
DAY 64 - 00:28 PDT - N/A - crazy brawl in tear gas (Portland)
DAY 64 - 00:48 PDT - N/A - More teargas out, including off the roof, note the green smoke (Portland)
DAY 64 - 00:52 PDT - N/A - feds begin retreat inside https://twitter.com/hungrybowtie/status/1288747806472024065?s=20
DAY 64 - 00:53 PDT - N/A - feds holy pepperballs (Portland). Someone goes down from pepper balls 2 minutes later
DAY 64 - 01:07 PDT - N/A - Another goon squad of Portland feds make it inside in a hail of pepperballs https://twitter.com/hungrybowtie/status/1288748211692113920?s=20
DAY 64 - 01:14 PDT - N/A - More pepper balls out in Portland
DAY 64 - 01:14 PDT - N/A - More feds emerge from the court house  (Portland)https://twitter.com/hungrybowtie/status/1288749591450357760?s=20 then go back inside 4 min later https://twitter.com/hungrybowtie/status/1288749951468544001?s=20
DAY 64 - 01:20 PDT - N/A - Pepper balls to fence line from murder holes (Portland)
DAY 64 - 01:24 PDT - N/A - Feds are launching tear gas across the park, from inside the fence (Portland)
DAY 64 - 01:35 PDT - N/A - Feds still shooting out of the murder holes (Portland)
DAY 64 - 01:39 PDT - N/A - Feds drive up aggressively in unmarked feds attack the crowd then drive off........(possible failed snatch). Follow by lots of gas (Portland)
DAY 64 - 01:58 PST - N/A - Portland, OR - Trumpet man went over fence
DAY 64 - 02:20 PDT - N/A - someone likely the feds is pointing lasers from the roof at two mothers (Portland)
DAY 64 - N/A - N/A - portland feds complain of air quality https://twitter.com/hungrybowtie/status/1289046761625931777?s=20
DAY 64 - N/A - Schenectady, NY - a small fight broke out between protesters and counter protesters
DAY 64 - 16:50 PDT - N/A - protesters in Schenectady, NY sit and block a main road for 20ish minutes before marching down the road
DAY 64 - 17:35 PDT - N/A - Police in Schenectady, NY form riot line and use annoying siren
DAY 64 - 17:45 PDT - N/A - Schenectady, NY bottle thrown, pepper balls fly. Police advance on protesters. No indication that it has been declared unlawful
DAY 64 - 18:06 PDT - N/A - hundreds of Protesters in NYC lay in the street.
DAY 64 - 19:15 PDT - N/A - Black Zebra Productions has a convo with a Sherriff in Portland
Day 64 - 19:45 PST - Springfield, OR - @ the mayors house
Day 64 - N/A - N/A - a small protest at the store in Ferguson MO where Mike Brown was shot after DA review decides to not indict officer.
Day 64 - N/A - N/A - protest at home of Los Angeles County sheriff's deputy officer Miguel Vega who shot and killed Andres Guardado (18M) (Los Angeles)
Day 64 - 22:22 PDT - N/A - First Portland courthouse fence banging
Day 64 - 22:45 PDT - N/A - Seattle woman's march organizers confront King County Executive Dow Constantine
Day 64 - 23:05 PST - N/A - Portland Police may have grabbed someone.?????
Day 64 - 23:15 PDT - N/A - first firework in Portland, not near courthouse
Day 64 - 23:26 PDT - N/A - trash and glass being thrown over Portland courthouse fence
Day 65 - 00:30 PDT - N/A - Arex commands the mic and the crowd in Portland
Day 65 - 01:00 PDT - N/A - singing and good speeches at Don't Starve PDX march in Portland @Peninsula Park (Across the river?) 
^https://clips.twitch.tv/ResourcefulAthleticShrimpFeelsBadMan + https://clips.twitch.tv/ObservantPowerfulMarrowNerfRedBlaster + https://clips.twitch.tv/RelentlessImpossibleDelicataKappaWealth
DAY 65 - 18:40 PDT - N/A - Seattle march is joined by Native American drum line. (Black-Indigenous Coalition march)
DAY 65 - 21:15 PDT - N/A - Streamer Hiram talks about the discussions going on among organizers in Austin. some want to be more aggressive, but APD is also being more aggressive with arrests (audio is off stream https://www.facebook.com/watch/live/?v=1391239137736345&ref=watch_permalink)
day 65 - 21:24 PDT - N/A - we are woke chant
DAY 65 - 21:26 PDT - N/A - Austin PD makes aggressive snatch arrest. also takes a dog (believed to be because a protester used a truck as a barricade earlier) https://twitter.com/TexasEmperor/status/1289420713216970752?s=20
DAY 65 - 21:29 PDT - N/A - Mace deployed in Austin
DAY 65 - 21:45 PDT - N/A - protesters (I think) in Denver damage a fence on state capital grounds. 2 are arrested one of them is hurt. ambulance called. 
^(Updated after: 1 of the people was not a protester, just someone who was eating on the grounds and then was filming the police arrest the first guy. The police then attempt to arrest him and shit goes down. The non protesters was also tased for "resisting arrest")
DAY 65 - 21:55 PDT - N/A - Denver PD fire pepper balls at indivduals following police who were moving the arrestees. https://www.youtube.com/watch?v=YYNQQqeWTkQ
DAY 65 - 22:10 PDT - N/A - Denver medics arrive then leave a few minutes later with no one on stretcher. Not clear if they spoke to anyone
DAY 65 - N/A - N/A - Portland protesters hold "going away" party for feds
DAY 65 - 23:34 - N/A - small firework thrown over Portland fence. Action immediately condemned by other protesters.  (no vid) https://twitter.com/Clypian/status/1289450117557231616?s=20
DAY 66 - 00:00 PDT - N/A - nothing to note but peace
DAY 66 - 00:40 PST - Portland, OR - Group setting USA flag on fire (Noting mainly in case FEDs start stuff up this might be reason)
DAY 66 - 00:51 PST - Portland, OR - Sputnik stream has fire on inside of fence
DAY 66 - 01:21 PDT - N/A - strange church bells heard around Portland courthouse
DAY 66 - 01:30 PDT - N/A - Protesters are banging on the rear garage door of courthouse
DAY 66 - 02:48 PDT - N/A - ConcreteReporting got a beast interview with beneficial interruptions. Needs to be clipped.
DAY 66 - 16:49 PDT - La Mesa, CA PD form a riot line between BLM protesters and counter protesters.  Protesters then start marching away followed by a few counter protesters https://www.facebook.com/EkRojas760/videos/3173107979421863/
Day 66 - N/A - N/A - very large marches in Philadelphia PA, La Mesa CA and Washington DC. Also large events in Portland OR,  Austin TX and Nashville TN, Chicago IL, Seattle WA. Sacramento CA
DAY 66 - 17:00 PDT - N/A - Boogaloo's who oppose gov't oppression visit the vigil for Garret Foster (Austin) https://twitter.com/MaxGeopolitics/status/1289712367152947200?s=20  https://www.facebook.com/watch/live/?v=920319628446671&ref=watch_permalink
DAY 66 - 17:20 PDT - N/A - Austin PD storm the vigil for Garret Foster and start pepper spraying. (i lack more details, but this is separate from the main Austin event) https://twitter.com/CandiceBernd/status/1289717781395472384?s=20
DAY 66 - 18:00 PDT - N/A - good, factual speech about what we are protesting against (Portland) https://www.facebook.com/tre.stewart/videos/3125467880869025/
DAY 66 - 18:25 PDT - N/A - Fights break out between protesters and counter protesters. (not at all supported by the BLM organizers). Riot police are force to break it up. 1 counter protester arrested. https://www.facebook.com/EkRojas760/videos/3173107979421863/
DAY 66 - 18:35 PDT - N/A - some handshaking between protesters and counter protesters in Austin before the police step in separate the crowds
DAY 66 - 19:00 PDT - N/A - BLM March in DC takes the highway https://twitter.com/ChuckModi1/status/1289743604672368641?s=20
DAY 66 - 19:00 PDT - N/A - Austin PD has formed a riot line (reason unknown) at the smaller event  near the vigil for Garrett Foster  with armed Boogaloo's . Several were arrested, pepper spray deployed. https://twitter.com/Third3y3Club/status/1289748625015230465?s=20
DAY 66 - 19:30 PDT - N/A - Austin protester have surrounded the cops  then march away a few minute later. https://twitter.com/sav_says_/status/1289751141140455426?s=20
DAY 66 - 19:30 PDT - N/A - most of the smaller Austin protest near the vigil has marched away, though a few armed individuals remain guarding it. https://twitter.com/kidwell_nate/status/1289758859440005121?s=20
DAY 66 - 20:18 PDT - N/A - one march has taken a highway in Austin and hold it till 20:33 https://twitter.com/CandiceBernd/status/1289763195616288769?s=20 + https://twitter.com/CandiceBernd/status/1289765026463510528?s=20
Day 66 - 20:50 PDT - N/A - Austin PD at HQ detain several black individuals on "suspicion of making Molotov's" they are then let go ...............
Day 66 - 21:08 PDT - N/A - Austin PD announcement to get out of the street by HQ (where the march went after the highway)
Day 66 - 21:13 PDT - N/A - Austin horse patrol, bike cops and riot cops force protesters onto the sidewalk.......but block the street themselves. There must be 200 cops and 100ish protesters
Day 66 - 21:35 PDT - N/A - armed protesters arrive at Austin HQ (not counter protesters) crowd dispersed 20 minutes later 
Day 66 - N/A - N/A - Interview with Boogaloo member
^https://twitter.com/TexasEmperor/status/1289794760966696963?s=20
Day 66 - 21:43 PDT - N/A - Multnomah County Sheriff's Office (Portland) is giving LRAD warning to not enter the property and force may be used to a totally peaceful crowd https://twitter.com/hungrybowtie/status/1289784513363509249?s=20 + https://twitter.com/shane_burley1/status/1289784553050054656?s=20  https://twitter.com/hungrybowtie/status/1289791877223350273?s=20
Day 66 - 21:57 PST - N/A - For ZERO reason police declared an unlawful assembly formed a riot line and are forcing the protest away from the station. macing people and slashing tires, some arrests made for? (Portland) https://twitter.com/IwriteOK/status/1289787750460219392?s=20 https://twitter.com/ColumbidaeRecon/status/1289791054607048704?s=20
^Police also attack a man on a bike then let them go https://twitter.com/hungrybowtie/status/1289791877223350273?s=20
^https://twitter.com/PDocumentarians/status/1289792025580023808
Day 66 - 22:03 PST - N/A - Arex is knocked to the ground (Portland)
Day 66 - N/A - N/A - Police are noted to have attacked a press car https://twitter.com/str34mtv/status/1289796171053977601?s=20
^https://twitter.com/TheRealCoryElia/status/1289795602667118592?s=20
Day 66 - N/A - N/A - no action at Portland federal courthouse yet. crowd is calm
Day 66 - 22:17 PDT - N/A - Portland police are noted to be outside the justice center with weapons for no clear reason. https://twitter.com/JulesBoykoff/status/1289808290663211008?s=20
Day 67 - 00:01 PDT - N/A - Portland Protesters kick ????? out of the crowd by JC
Day 67 - 16:45 PDT - N/A - police in Utah attack BLM dance party with tear gas and batons. (I lack more context) https://twitter.com/ThisIsTheDuke/status/1290070588900270080?s=20 + https://twitter.com/Harryson_james/status/1290094912805847041?s=20 + https://twitter.com/ActuallyDSW/status/1290095124442054656?s=20 + https://www.facebook.com/CouncilWomanTaliBruce/videos/587445865252832
Day 67 - 18:33 PST - N/A - Attempted arrest, de-arrest completed.  Another individual arrested - LA Cali
Day 67 - 22:23 PDT - N/A - Small fire in the road in Louisville, KY. Police set up riot line to protect the firemen. Otherwise pretty calm and the police are forced to stand in the rain.
Day 68 - N/A - N/A - nothing to note. quiet night.
DAY 68 - N/A - N/A - A large crowd of BLM supporters and bootlicking counter protesters in Cottonwood Heights UT after the events of yesterday.
Day 68 - 20:30 PST - Portland, OR - Tweet reports protester stabbed.  NSFW: Blood - Portland OR
^https://twitter.com/pdxfrontline/status/1290491822393839616
Day 68 - 21:30 PST - Portland, OR - Protestors at Multnomah Co Sheriff Office
Day 68 - 22:04 PST - Portland, OR - LRAD Annoucement to stay off MCSO property, officers observe objects being thrown, threats for use of force if continued
Day 68 - 22:45 PST - Portland, OR - Police line (OSP) @ JC (started off stream) Macsmiff reported arrest of a minor/attempted dearrest
Day 68 - 22:58 PST - Portland, OR - OSP fire pepperballs while retreating from arrest
Day 68 - 23:28 PST - Portland, OR - LRAD gives warning to not enter property again @ MCSO
Day 68 - 23:30 PST - Portland, OR - Protest @ MCSO declared unlawful assembly, protester shield line formed on edge of property
Day 68 - 23:45 PST - Portland, OR - Police rush and arrest protester @ MCSO, form line and bull rush down the street
Day 68 - 23:49 PST - Portland, OR - Press pepper sprayed during bull rush
Day 69 - 00:05 PST - Portland, OR - Police smoke grenade/retreat
Day 69 - 10:30 PST - N/A - Frank Nitty II begins his march on foot to DC from Milwaukee, WI. Day 1 of the march to DC. https://www.facebook.com/100011275926869/videos/1169216826797504/
Day 69 - 22:36 PDT - N/A - PPB warns members of the crowd "who are attempting to break into the PPA (union building)" to stop https://twitter.com/PortlandPolice/status/1290883552683286528?s=20 no evidence seen on the streams
Day 69 - 23:18 PST - N/A - pickup truck barrels thru protest at PPA building (portland). Hits motor bike, no people though. https://twitter.com/Jamesma67762923/status/1290895100713873408?s=20
^https://twitter.com/MrOlmos/status/1290895559071371265
^https://twitter.com/gravemorgan/status/1290895186516570112?s=20 
^https://twitter.com/MiriamMarauders/status/1290900071794450434?s=20
^https://twitter.com/Oregonian/status/1290897669653581825?s=20 
^https://twitter.com/TheHannahRay/status/1290895698506915842?s=20  
^https://twitter.com/MacSmiff/status/1290899317570428928?s=20
^https://youtu.be/ozXChhOSODk 
Day 69 - 23:56 PDT - Unlawful assembly declared at PPA building (reason unknown). police begin sweep. smoke bombs thrown. some fireworks shot into the air.
Day 70 - 00:20 PDT - Portland, OR - PPB throws smoke and retreats.
Day 70 - 00:30 PDT - 3 shots fired near PPA protest, believed to be into the air. No one is hit
Day 70 - 00:33 PDT - Portland, OR - Police show up to investigate the shooting (PPA- Portland)
Day 70 - 00:39 PDT - Police conclude their investigation and leave. The last to leave deploy flashbangs and smoke. (PPA - Portland) https://twitter.com/NickTagliaferro/status/1290551593117585408?s=20
Day 70 - N/A - Robert Evans interviews people involved https://twitter.com/IwriteOK/status/1290918726640865280?s=20
Day 70 - 01:23 PST - Declared riot and 3rd warning may subject to citation and tear gas (Portland)
Day 70 - 01:25 PST - Tear gassed! Jeepers for nothing! No riot
Day 70 - 01:40 PST - Arrest don't know why. Maybe cause not being on sidewalk?
Day 70 - 02:20 PST - Injured protestor taken from scene in ambulance
DAY 70 - 13:20 CDT - Frank Nitty II starts the 2nd day of his march from Milwaukee to DC
^https://www.facebook.com/100011275926869/videos/1170575953328258
DAY 70 - 14:00 PDT - very large march in Seattle WA from the new youth jail to city hall. (at least a couple thousand) https://www.youtube.com/watch?v=RdHxHb39nl4 
^good shot of crowd size https://clips.twitch.tv/FlaccidHotSpaghettiKappaWealth + https://clips.twitch.tv/CrepuscularHappyPeachPastaThat
DAY 70 - N/A - Seattle city council vote not to defund SPD despite having 7 confirmed votes (6 did not hold their promise, Kshama Sawant came through) they did get other wins tho https://twitter.com/daeshikjr/status/1291148259465994242?s=20
DAY 70 - N/A - Police in Eugene OR go to protesters houses and made arrests for charges such as riot, 4th degree assault, criminal mischief. (at least 20 arrests) https://twitter.com/chadloder/status/1291244208418770944?s=20
DAY 70 - N/A - SERT (SWAT) raided MultCo jail in retaliation for a Mercury article about jail strike/protest. (Multnomah County - Portland) https://twitter.com/alex_zee/status/1291108022232612864?s=20
Day 70 - 22:36 PDT - Seattle, WA - more pepperballs in seattle??? (may have been a drum)
Day 70 - 22:45 PDT - Seattle, WA - person detained
Day 70 - 22:49 PST - Portland, OR - PPB pushing the line again further away from East Precinct.
Day 70 - 22:49 PDT - Eugene, OR - fight between protesters and counter protesters
Day 70 - 22:51 pst - portland dj lrad declares a riot again, presumably warning of an incoming cop riot
Day 70 - 22:53 PDT - Portland, OR - PPB force moms off the road onto the sidewalk but do not arrest them..... https://clips.twitch.tv/UninterestedEncouragingGiraffeMau5
Day 70 - 22:57 PDT - Portland, OR - PPB saying only press can remain
Day 70 - 22:59 PDT - Portland, OR - PPB retreat https://twitter.com/JenDowlingKoin6/status/1291252186697981952?s=20
Day 70 - 23:06 PDT - Portland, OR - PPB bike cops pull over yellow car stop ends at 23:17
Day 70 - 23:20 PDT - Portland, OR - PPB continued riot warnings and advance tho nothing new happened
Day 70 - 23:22 PDT - Portland, OR - PPB charge protesters onto side street though don't follow
Day 70 - 23:29 PDT - Portland, OR - PPB advance down neighborhood side street which has no sidewalks
Day 70 - 23:34 PDT - Portland, OR - medic call but none around, two protesters injured. (one is believe to be a mom who was trampled by PPB)
Day 70 - 23:39 PDT - Portland, OR - PPB medics finally go help.
Day 71 - 00:15 PDT - Portland, OR - PPB says device was not explosive........ :sus: https://twitter.com/PortlandPolice/status/1291271748969627648
Day 71 - 00:30 PDT - Portland, OR - PPB show up again
Day 71 - 00:31 PDT - Portland, OR - PPB charge and arrest someone with a shield in the street
Day 71 - 00:40 PDT - Portland, OR - PPB leave
Day 71 - 00:45 PDT - Portland, OR - tire slashed seen on stream not clear when it happened
Day 71 - N/A - Portland, OR - Oregon State Police show up at protesters houses in Portland https://twitter.com/R3volutionDaddy/status/1291522109672308737?s=20
Day 71 - 21:43 PDT - Portland, OR - March to East Precinct begins and is met with strange announcement from PPB LRAD https://clips.twitch.tv/GiantAstuteNewtGrammarKing https://twitter.com/shane_burley1/status/1291596500091326466?s=20
Day 71 - 21:45 PDT - Portland, OR - someone breaks a camera on east precinct https://twitter.com/MrOlmos/status/1291597269796401153?s=20 + https://twitter.com/hungrybowtie/status/1291597989668982786?s=20 exact time unclear
Day 71 - 21:51 PDT - Portland, OR - unlawful assembly declared by east precinct. paint thrown on precinct https://twitter.com/hungrybowtie/status/1291598662808686592?s=20
^paint thrown on counter protester
^https://twitter.com/PDXzane/status/1291597748366528512?s=20
Day 71 - 21:52 PDT - Seattle, WA - everyday march meets with deputy mayors and various mayor staff
Day 71 - N/A - Portland, OR - officers on East Precinct roof recording the crowd 
^https://twitter.com/TheRealCoryElia/status/1291602184270880768?s=20
^https://twitter.com/Johnnthelefty/status/1291602582893244416?s=20
Day 71 - 22:20 PDT - Portland, OR - PPB push north
Day 71 - 22:22 PDT - Portland, OR - snack van tire slashed. arrest made https://clips.twitch.tv/TenuousPerfectCoyoteYee
Day 71 - 22:25 PDT - Portland, OR - PPB LRAD has a flat tire. (slashed) https://twitter.com/KohzKah/status/1291607424529391617?s=20
Day 71 - 22:36 PDT - Portland, OR - PPB Load up on top box van. stuff thrown. drive down the street
Day 71 - 22:37 PDT - Portland, OR - arrest made on private property
Day 71 - 22:39 PDT - Portland, OR - PPB deploy smoke https://clips.twitch.tv/ShyWittyOcelotHassaanChop
Day 71 - 22:41 PDT - Portland, OR - PPB threaten the press for picking up smoke https://clips.twitch.tv/BenevolentSpicySalmonDancingBanana + https://twitter.com/hungrybowtie/status/1291620686910246912?s=20
Day 71 - 22:44 PDT - Portland, OR - load up again, shoot smoke. Protesters march back https://clips.twitch.tv/MoralApatheticReubenResidentSleeper
Day 71 - 22:44 PDT - Seattle, WA - a march being followed but many police vehicles. (Not the every day march)
Day 71 - 22:57 PDT - Portland, OR - People sitting in the street in portland
Day 71 - 22:59 PDT - Portland, OR - PPB rush in on vans and form riot line and push protesters (may be because they were near nazi ladies house)
Day 71 - 23:02 PDT - Portland, OR - medic cart tipped https://clips.twitch.tv/NaiveHappyCormorantRaccAttack + https://twitter.com/Cascadianphotog/status/1291616494946672642?s=20 + https://twitter.com/Bitchwitch20/status/1291643458604503040?s=20
Day 71 - 23:11 PDT - Portland, OR - cops load up and pull out. egg thrown at officer
Day 71 - 23:30 PDT - Portland, OR - someone steps in the street and PPB grabs them? (unclear exact reason)
Day 71 - 23:40 PDT - Portland, OR - PPB load up,  and use the repaired LRAD to push protesters
Day 71 - 23:47 PDT - Portland, OR - Less lethals fired (audio only)
Day 71 - 23:53 PDT - Portland, OR - group of mostly press forced back away from crowd. Police annoying the world with sirens
Day 71 - 23:56 PDT - Portland, OR - arrest made
Day 71 - N/A - Press member told to move or get run over https://twitter.com/45thabsurdist/status/1291637433428086785?s=20
Day 72 - 00:15 PDT - Portland, OR - several arrests made. bit of chaos 
^https://clips.twitch.tv/ExcitedBelovedDragonPipeHype
^https://clips.twitch.tv/HotFilthyCrabThisIsSparta
Day 72 - N/A - officer walks through the crowd to mace a specific protester
^https://twitter.com/GriffinMalone6/status/1291649145363554309?s=20
Day 72 - 00:25 PDT - Portland, OR - ppb load up and leave
Day 72 - 00:31 PDT - Portland, OR - firework shot into air
Day 72 - 00:35 PDT - Under the authority of 14C.30.010 titled "authority to restrict access to certain areas", we are closing SE 106th Ave from SE Washington St to SE Cherry Blossom St. Any persons including members of the press who violate this order will be subject to arrest.   https://twitter.com/PortlandPolice/status/1291639464486252544?s=20 https://www.portlandoregon.gov/citycode/article/15984
Day 72 - 00:50 PDT - Portland, OR - riot line
Day 72 - 00:56 PDT - Portland, OR - PPB fire marking round and leave https://clips.twitch.tv/SpunkyLongApeFloof
Day 72 - 00:59 PDT - Portland, OR - PPB high beams toward protesters
Day 72 - 01:14 PDT - Portland, OR - firework shot into air
Day 72 - 01:31 PDT - Portland, OR - PPB charge crowd https://clips.twitch.tv/StrangeLivelyCroissantAMPTropPunch
Day 72 - 01:38 PDT - Portland, OR - PPB load up and leave
Day 72 - 02:01 PDT - Portland, OR - PPB charging - 1 arrest
Day 72 - 17:24 PDT - Rockford, IL - Arrest in Rockford IL. Unclear what for.
Day 72 - 18:54 PDT - Rockford, IL - another Arrest in Rockford - Unclear why
Day 72 - N/A - Detroit, MI - Very large and energetic march in Detroit, MI
^https://www.facebook.com/eketner/videos/10223311376514559
Day 72 - N/A - Seattle, WA - everyday march (with TK, Katie, Tati and Payday) in Seattle is very large tonight.
Day 72 - N/A - Portland, OR - Portland has two protests 1 small one at the Justice Center and a 2nd larger march headed to MSCO
Day 72 - 21:44 PDT - Portland, OR - Portland march arrives at MCSO and gets warned right away to stay off property. Also pointing a very bright light at the crowd. https://twitter.com/PortlandPolice/status/1291958440235896839?s=20
Day 72 - 21:47 PDT - Portland, OR - PPB rushed out and grabbed a photog who was taking shots of the protestors. - https://twitter.com/GriffinMalone6/status/1291959372268990464?s=20
Day 72 - 21:48 PDT - Portland, OR - officers attack shield wall  at MCSO 
^https://twitter.com/hungrybowtie/status/1291959719884554240?s=20
Day 72 - 21:55 PDT - Portland, OR - protest at MCSO  declared unlawful
Day 72 - 22:11 PDT - Portland, OR - if MCSO was not declared unlawful before it is 100% now. PPB claim officers were struck by projectiles though none seen thrown, and claim people are breaking retaining wall tho also not seen https://twitter.com/PortlandPolice/status/1291966446822596609?s=20 + https://twitter.com/aimeeniles/status/1291971746313060352?s=20
Day 73 - N/A - LRAD noted to be barely audible tonight https://twitter.com/Oregonian/status/1291962977445240833?s=20
Day 72 - 22:38 PDT - Portland, OR - PPB rushes out and forms a quick line then retreats back.
Day 72 - 22:53 PDT - Portland, OR - Person walks onto property filming. PPB runs out, person gets arrested.
^https://twitter.com/hungrybowtie/status/1291976761559769088?s=20
Day 72 - 23:10 PDT - Portland, OR - Person in front of shield wall moons the police
Day 72 - 23:16 PDT - Portland, OR - Reports of trucks w/o plates headed towards MCSO where protests are taking place. - https://twitter.com/defendpdx/status/1291981573403762689
Day 73 - 00:02 PDT - Portland, OR - police run out to arrest person banging on flag pole. they fail and head back inside. https://twitter.com/45thabsurdist/status/1291992129233797125?s=20 + https://twitter.com/GriffinMalone6/status/1291993557146845190?s=20
^then the person returns https://twitter.com/GriffinMalone6/status/1291993835220815872?s=20
Day 73 - 00:09 PDT - Portland, OR - DJ LRAD announcement not clear what it was. first in a long time
Day 73 - 00:13 PDT - Portland, OR - Food being thrown towards MCSO driveway.
Day 73 - 00:14 PDT - Portland, OR - single crowd control munition used
Day 73 - 00:15 PDT - Portland, OR - PPB Smoke fired into crowd.
Day 73 - 00:40 PDT - Portland, OR - water bottle thrown but not near cops
Day 73 - 00:50 PDT - Portland, OR - PPB form riot line closer to protesters then back up
Day 73 - 00:53 PDT - Portland, OR - firework/m80 (not shot at cops)
Day 73 - 01:00 PDT - Portland, OR - PPB charge the shield wall, make arrests and mace protesters https://clips.twitch.tv/RichRudeNightingaleBatChest
Day 73 - 01:01 PDT - Portland, OR - PPB shoots pepper balls and smoke. Imperial march is playing on the speakers.
Day 73 - 01:05 PDT - Portland, OR - PPB force people down residential street and shove press along. Make violent arrest with mace. along with other arrests https://twitter.com/_WhatRiot/status/1292012255714787330?s=20
^https://twitter.com/BGOnTheScene/status/1292014941709295616?s=20
Day 73 - 01:37 PDT - Portland, OR - PPB load up onto trucks, unclear where they are headed
Day 73 - 01:46 PDT - Portland, OR - PPB stampede another group
^Press told they can do whatever they want https://clips.twitch.tv/FriendlyExpensiveSharkNerfRedBlaster
Day 73 - 01:52 PDT - Portland, OR - this same Police then load up and head off after the crowd
Day 73 - 02:24 PDT - Portland, OR - Someone is tossing home made PCV pipe bombs at the remaining crowd of mostly press https://clips.twitch.tv/NiceOptimisticAyeayeRalpherZ + https://clips.twitch.tv/SweetAltruisticChamoisTBTacoRight + https://clips.twitch.tv/PlayfulPopularPepperoniGrammarKing
^PPB responding.... or not 
^later update : FBI has joined the case https://www.opb.org/article/2020/08/19/explosive-portland-protest-navy-seal-fbi-investigation/
Day 73 - 19:20 PDT - Washington, DC -  protester's make way for fire truck https://twitter.com/LiteraryMouse/status/1292284864725766144?s=20
Day 73 - 19:42 PDT - Louisville, KY - protesters march and drive down 4th Street Live and knock over tables and chairs. large police response follows.
Day 73 - 19:53 PDT - Louisville, KY - protest declared unlawful. (may have been the second announcement)
Day 73 - 20:05 PDT - Louisville, KY - PD sweep that park and make 4+ arrests
Day 73 - 20:10 PDT - Louisville, KY - PD shoo press out of the area as the crowd has already dispersed so nothing to film
Day 73 - 20:16 PDT - Louisville, KY - foot chase person gets away
Day 73 - 20:21 PDT - Austin, TX - Arrest for using motor vehicle on sidewalk (electric bike)
Day 73 - 20:30 PDT - Seaside, OR - very tense situation between protesters and counter protesters with police in the middle
Day 73 - 20:48 PDT - Austin, TX - APD mess up the memorial for Garrett Foster in the process of arresting someone https://twitter.com/chibipoon/status/1292357231992868864
Day 73 - 20:51 PDT - Portland, OR - great view of the wall of vets (on stream) https://twitter.com/GriffinMalone6/status/1292304794825023488?s=20 another clip
Day 73 - 22:30 PDT - Portland, OR - large Portland march arrives at PPA building and is met with LRAD warning to not touch the building. https://twitter.com/PortlandPolice/status/1292335797308252165?s=20
Day 73 - 22:36 PM - Portland, OR - Stay Woke Chant on stream.
Day 73 - 22:54 PDT - Portland, OR - dumpster set on fire in street and creating barricade
Day 73 - 23:20 PDT - Portland, OR - protesters climb on PPA building and tamper with camera
Day 73 - 23:36 PDT - Portland, OR - PPB declare protest unlawful
Day 73 - 23:38 PDT - Portland, OR - PPB begin sweep, smoke out
Day 73 - 23:40 PDT - Portland, OR - Fire inside of PPA building. - https://twitter.com/1misanthrophile/status/1292350530048598016?s=20 + https://twitter.com/Shauna_Sowersby/status/1292350357973028867?s=20
Day 73 - 23:42 PDT - Portland, OR - PPB declares riot.
Day 73 - 23:50 PDT - Portland, OR - PPB/OSP make second arrest.
Day 74 - 00:05 PDT - Portland, OR - PPB had stopped for like 10 minutes before repeating announcements and advancing now. Massive blockade in street.
Day 74 - 00:10 PDT - Portland, OR - Protesters round the corner into very residential area + peninsula park. cops hold again
Day 74 - 00:13 PDT - Portland, OR -  PPB/OSP pushes line. Maces someone retreating. Likely because they were holding a shield. Ends up spraying his buddies. - https://clips.twitch.tv/BoxyKitschyCougarPanicVisThe_Fluffernater08/09/2020
DAY 74 - 00:15 PDT - PPB/OSP shoves person to the ground https://twitter.com/MrOlmos/status/1292371534045044736
Day 74 - 00:18 PDT - Portland, OR - Dance party in the park.jttv08/09/2020
Day 74 - 00:23 PDT - Portland, OR - few pepper balls shot
Day 74 - 00:23 PDT - Portland, OR - PPB Smoke and dip
Day 74 - 00:36 PDT - Portland, OR - PPB remove rocks from dumpster to post on twitter.jttv08/09/2020
Day 74 - 00:42 PDT - Portland, OR - Protesters have marched away from park
Day 74 - 00:47 PDT - Portland, OR - PPB make more announce and again march on crowd. thru barricade. Stuff thrown at cops. https://clips.twitch.tv/CovertDarlingLettuceKlappa
^make same area closed announcement as last night
Day 74 - 00:53 PDT - Portland, OR - Snack van tires popped again https://twitter.com/GriffinMalone6/status/1292369601095860224?s=20 (not on camera)
Day 74 - 01:05 PDT - Portland, OR - Tear gas in a neighborhood.jttv08/09/2020
Day 74 - 01:15 PDT - Portland, OR - Cops push people into Kenton Park and then declare it is closedjttv08/09/2020
Day 74 - 01:44 PDT - Portland, OR - PPB are chasing after not existent rioting crowd thru neighborhoods.
Day 74 - 01:47 PDT - Portland, OR - 2+ arrests.
Day 74 - 01:51 PDT - Portland, OR - arresting ACLU member https://twitter.com/ajsoulmate2928/status/1292385555381022720?s=20 + https://twitter.com/1misanthrophile/status/1292387123966836736?s=20
Day 74 - 02:06 PDT - Portland, OR - PPB pack up and leave.
Day 74 - 02:30 PDT - Portland, OR - Person on motorized bike hit 2 people, one seriously injured. Ambulance called. Police respond. (may have been a accident)
Day 74 - 10:00 PST - Fort Collins, CO - large brawl between protesters and bootlickers
^https://twitter.com/blktechwarrior/status/1292507096295051266?s=19 and update 3 arrested https://tinyurl.com/y5au3nds
Day 74 - 15:00 PST - Seattle, WA - smoke bomb set off (unclear by who) https://twitter.com/caseyworks/status/1292582944091996161
Day 74 - 18:00 PST - Louisville, KY - Protest ordered to get out of street by LMPD. some arrests made. (this is the end of a very large march which ended a bit ago) https://twitter.com/ACLUofKY/status/1292627330033123328?s=20 + https://twitter.com/TobinBen/status/1292634103762780162?s=20
^(Backstory: yesterday people trashed 4th Street Live, so today LMPD said people could not march in the street. Today people march)
Day 74 - 18:08 PST - Ferguson, MO - FPD order protester off police property and into the street.
Day 74 - 18:25 PST - Ferguson, MO - County police have formed a riot line for no reason https://twitter.com/Torcho/status/1292635102204370944?s=20
Day 74 - 18:36 PST - Ferguson, MO - now FPD are telling people it get on the sidewalk. hmmm
Day 74 - 20:20 PST - Ferguson, MO - 2+ arrests and mace out.
^Officers force people off the police property into the street with the riot line. Then they yell at the crowd to get out of the street. https://twitter.com/RachelDRice/status/1292663621852573696?s=20 + https://twitter.com/search4swag/status/1292666218189660160?s=20 + https://twitter.com/ChuckModi1/status/1292669449624068096?s=20
^1 person sprayed was a journalist https://twitter.com/ChuckModi1/status/1292675536527994880?s=20
Day 74 - 20:40 PST - Ferguson, MO - May have been declared unlawful (though no LRAD announcement heard on stream) https://twitter.com/RachelDRice/status/1292667383346278400
Day 74 - 21:30 PST - Portland, OR - March from Kenton Park to PPA
Day 74 - 21:48 PST - Portland, OR - PPB state "this is the Portland police. For those near the PPA do not participate in criminal activity" https://twitter.com/PortlandPolice/status/1292684647449559040
Day 74 - 21:55 PST - Portland, OR - unlawful declared
^not clear, but it may be because of a small fire by the rear of the building https://twitter.com/TheRealCoryElia/status/1292686099282706432?s=20
Day 74 - 22:05 PST - Portland, OR - two dumpster fires  in the street then PPB begin riot line sweep
Day 74 - 22:10 PST - Portland, OR - one arrest made
Day 74 - 22:11 PST - Portland, OR - declared a riot
Day 74 - 22:11 PST - Portland, OR - Bullrushing and arrest on teebs after 2 dumpster fires and 1 firework out.
Day 74 - 22:12 PST - Portland, OR - Tire slashed by ppb on Adam's stream. Red 4 runner
Day 74 - 22:14 PST - Portland, OR - 2nd firework out on teebs stream
Day 74 - 22:27 PST - Portland, OR - riot line sweep thru the park and make arrests in park they also drive thru the park. More arrests made just after back on the main road by PPA https://twitter.com/TheRealCoryElia/status/1292695942131404800?s=20 +
^https://clips.twitch.tv/SteamyAlertDillSaltBae
Day 74 - 22:50 PST - Chicago, IL - Chicago is looting and rioting https://twitter.com/ChiLivePD/status/1292697790351630338?s=20
Day 74 - ~2:51 PST - Seattle, WA - multiple store windows were shattered
^https://clips.twitch.tv/AgreeableNeighborlyKimchiSpicyBoy
Day 74 - 22:51 PST - Seattle, WA - Seattle PD check thru medics bags and release them
^https://twitter.com/infantry1/status/1292696393354633216?s=20
Day 74 - 23:03 PST - Portland, OR - Portland many arrest in front of PPA https://twitter.com/garedicus/status/1292703223300726785
Day 74 - 23:04 PST - Portland, OR - arrest of "press" https://clips.twitch.tv/SmellyUnsightlyBearHumbleLife
^https://twitter.com/PDX_Monitor/status/1292703779029241858
Day 74 - 23:04 PST - Chicago, IL - CHICAGO has gone mad.
Day 74 - 23:14 PST - Chicago, IL - maybe more arrests Portland (people sitting on van bumpers)
Day 74 - 23:18 PST - Portland, OR - ppb hand milk to memeber of press???? https://clips.twitch.tv/LightAnnoyingSpindleTheTarFu
Day 74 - N/A - Chicago, IL - police have arrived in down town Chicago where looting is
Day 74 - 23:22 PST - Portland, OR - aggressive arrest in Chicago
Day 74 - N/A - https://twitter.com/sh_janan/status/1292714156446093317
Day 74 - N/A - Chicago, IL - more shots fired in chicago https://twitter.com/SPOTNEWSonIG/status/1292716017840422912
Day 74 - 23:58 PST - Portland, OR - PPB says road by PPA is open for vehicular traffic
Day 74 - N/A - Chicago, IL - person tries to run over CPD
^https://twitter.com/stillgray/status/1292714141203886082?s=20
^more shots fired in chicago https://twitter.com/SPOTNEWSonIG/status/1292717581640634368?s=20
^Looting is continuting will note if and when we think it stops
^more gun shots heard on stream
Day 74 - 02:16 PST - Chicago, IL - gunshots heard on king delorean stream at 12:16 AM PST Chicago
Day 74 - N/A - Chicago, IL - violent arrest in chicago https://twitter.com/paigexfry/status/1292721526605742081
Day 74 - N/A - shots fired in Bloomingdales https://twitter.com/ChiLivePD/status/1292726137039265794?s=20
Day 74 - N/A - at least one person shot in arm at Wabash/Ontario
Day 74 - N/A - https://twitter.com/SPOTNEWSonIG/status/1292726536173506560?s=20 
Day 75 - 12:50 PST - Chicago, IL - 1 black vehicle stopped and arrested, cops throwing bags of loot out of car
Day 75 - 01:03 PST - Chicago, IL - looting continues, "multiple vehicle accident" on police scanner at Harrison/Wabash
Day 75 - 01:07 PST - Portland, OR - accident in Portland (Car hit a motorcycle? person gets up after)
Day 75 - 01:33 PST - Chicago, IL - reports of national gaurd macing on chell wallace fb stream
Day 75 - 01:41 PST - Chicago, IL - Reports of people in sky rise dumping food and pee onto looters
Day 75 - 01:56 PST - Chicago, IL - roosevelt/canal shots fired - chicago
Day 75 - 01:56 PST - Chicago, IL -  1 arrest at vans store on cedar/state - chicago
Day 75 - 01:59 PST - Chicago, IL - more shots fired on illinois/rush - officer hit with a bottle in neck?
Day 75 - 02:00 PST - Chicago, IL - Rouge scanner traffic on CPD scanner
Day 75 - 02:01 PST - Chicago, IL - Black Male security gaurd shot in the back at 441 clark street
Day 75 - 02:10 PST - Chicago, IL - car ramming into building https://twitter.com/Realchibaby/status/1292750187098714112
Day 75 - N/A - Chicago, IL - https://twitter.com/Chicago_Scanner/status/1292753580970180608 700 N Michigann EMS responding to a person shot behind Saks"
Day 75 - N/A - Chicago, IL - https://twitter.com/DHensleyChicago/status/1292754250997563393  - Chicago - "20 E Randolph - 3 people reported shot "
Day 75 - N/A - Another shooting on stream garland and lake police shot at and return fire
Day 75 - N/A - shots fired at lake and dearborn?
Day 75 - N/A - officer almost hit by car, suspect arrested
Day 75 - 14:50 PST - Washington, DC - Trump pulled out of press briefing. https://twitter.com/MeetThePress/status/1292942860799676419?s=20 Moments before. Secret Service fire two shots at someone near the White House. person taken to hospital https://twitter.com/ChanelRion/status/1292942383861071872?s=20 https://twitter.com/RobNicholls15/status/1292952442355822593?s=20
^shooting audio https://twitter.com/cspanJeremy/status/1292957136675385347?s=20 https://twitter.com/Breaking911/status/1293020956139687937?s=20
Day 75 - 16:37 PST - Nashville, TN - Large amount of State Troopers in Nashville TN, arrest made
^https://twitter.com/Tennessean/status/1292968536785248257?s=20
Day 75 - 17:00 PST - Chicago, IL - Chicago very tense, crowd control munitions may have been used
Day 75 - 17:35 PST - Chicago, IL - firework
Day 75 - 19:32 PST - Athens, GA - confederate monument being removed
Day 75 - 19:51 PST - Chicago, IL - Looting in progress at 7-11, walgreens, and boost mobile
Day 75 - 19:56 PST - Portland, OR - https://twitter.com/backoffhipster/status/1293018379633098752  Riot cops spotted on their riot van
DAY 75 - 20:35 PST - Chicago, IL - two females struck by silver ford explorer, hit and run on state/hubbard https://twitter.com/CWBChicago/status/1293029954691661827
Day 75 - N/A - Seattle, WA - Seattle Police Chief Carmen Best to resign https://www.q13fox.com/news/sources-seattle-police-chief-carmen-best-to-resign
Day 75 - 21:50 PDT - Portland, OR - Portland begins march from Alberta Park to  PPB North Precinct - https://goo.gl/maps/2Fz3opGMqDa13wSY6
Day 75 - 22:05 PDT - Portland, OR - Portland - march arrives and is met with PPB outside north precinct in riot gear
Day 75 - N/A - Seattle https://twitter.com/zmboop/status/1293053881572716544?s=20 + https://twitter.com/zmboop/status/1293054519710867457?s=20
Day 75 - 22:20 PDT - Portland, OR - PPB LRAD to those near the North Precinct don't blah blah blah announcement. Also flashlight strobe wars.
Day 75 - 22:30 PDT - Portland, OR - PPB are now pointing car highbeams at the crowd
Day 75 - 22:34 PDT - Portland, OR - PPB specifically call out one person for shining a strobe light at officers
Day 75 - 22:54 PDT - Portland, OR - PPB call out people  throwing eggs at officers by boys and girls club  so violent https://twitter.com/TheHannahRay/status/1293062687711096832?s=20
Day 75 - 23:05 PDT - Portland, OR - declared unlawful for no clear reason
Day 75 - 23:09 PDT - Portland, OR - sweep + some heavy handed arrests made (taser may have been used) https://twitter.com/R3volutionDaddy/status/1293069913603444736?s=20 + https://twitter.com/andrewtheen/status/1293072130251227136?s=20 + https://clips.twitch.tv/ConfidentWonderfulStarlingPeoplesChamp knee on  protester
Day 75 - 23:13 PDT - Portland, OR - PPD appears to arrest a child
Day 75 - 23:20 PDT - Portland, OR - PPB uses gas or smoke. Also slash vans tires (not SnackVan) - https://clips.twitch.tv/FunObedientMelonPeteZarollTie
Day 75 - 23:24 PDT - Portland, OR - revolution ribs tires slashed ^
^https://twitter.com/dRevolutionEats/status/1293090174855913473?s=20 credit to @Gotrees
Day 75 - 23:26 PDT - Portland, OR - At least one Protester seriously hurt
Day 75 - 23:46 PDT - Portland, OR - Protest going back to park peacefully and gets crashed by PPB who cut them off https://clips.twitch.tv/GloriousSpinelessStarWoofer + https://clips.twitch.tv/MistySuperRatRaccAttack
Day 75 - 23:56 PDT - Portland, OR - more arrests https://clips.twitch.tv/VibrantGracefulCormorantOMGScoots
Day 76 - 00:11 PDT - Portland, OR - PPB yell at person person with drum to get out of street or may be subject to arrest https://clips.twitch.tv/LitigiousSarcasticSandwichAsianGlow
Day 76 - 00:14 PDT - Portland, OR - more arrests
Day 76 - 00:24 PDT - Portland, OR - PPB retreats back.
Day 76 - 00:35 PDT - Portland, OR - Protestors are back at PPB North Precinct.
Day 76 - 01:11 PDT - Portland, OR - PPB push out and make targeted arrests. One arrest reportedly ACLU/Legal Observer on bike. - https://clips.twitch.tv/RamshackleRepleteWaffleOpieOP
Day 76 - 01:14 PDT - Portland, OR - Officer slaps phone out of NLG's hand. (unsure if OSP or PPB) by @skweetis
Day 76 - 01:15 PDT - Portland, OR - unlawful assembly declared again.  2 arrests were made ^
Day 76 - 01:19 PDT - Portland, OR - paint balloon tossed at PPB, but missed https://clips.twitch.tv/SmoothRelatedSheepOSfrog
Day 76 - 01:15 PDT - Portland, OR - portland arrests -2
Day 76 - 01:34 PDT - Portland, OR - LRAD announcement about unlawful assembly, Move west,  May subject to arrest, citation, tear gas, or impact munitions
Day 76 - 01:39 PDT - Portland, OR - Police rush forward to arrest someone sitting in a car, popped tires https://clips.twitch.tv/SweetAggressiveLadiesYee
Day 76 - 01:40 PDT - Portland, OR - PPB then drive the car without a warrant and wreck all the tires on stop strips.... then preform illegal search https://clips.twitch.tv/SaltyFamousJalapenoHoneyBadger
Day 76 - 01:58 PDT - Portland, OR - Police line backs off
Day 76 - N/A - Portland, OR - Portland DA says they are dropping most charges https://twitter.com/portlandmercury/status/1293255853043146752?s=20
Day 76 - 18:00 PDT - Omaha, NE - a 15ish bootlickers show up to a 200 strong BLM protest. crowd chants "bootlickers go away, your outnumbered anyway" and they leave 15 min later. But the bootlickers got the police to escort them out.
Day 76 - 21:31 PDT - Seattle, WA - EDM march runs into SPD doing traffic control. Asks them to leave. - https://clips.twitch.tv/RepleteColdYakinikuTTours
Day 76 - 21:34 PDT - Seattle, WA - SPD traffic control given the boot. https://twitter.com/KittyLists/status/1293406022220972032
Day 76 - 21:39 PDT - Portland, OR - PPB LRAD warning to not do anything. March had not arrived at the building Kelly building (they were close to Kelly building/MCSO?) https://twitter.com/PortlandPolice/status/1293406454234247171?s=20'
Day 76 - 21:40 PDT - Portland, OR - someone drove past and pepper sprayed the crowd , (may be a white Nissan truck) https://twitter.com/IwriteOK/status/1293411346923454464?s=20
Day 76 - ~21:42 - Portland, OR -  someone falls off the back of a truck. person injured, police medics help, ambulance shows up https://twitter.com/jovannithe1st/status/1293408810699091968?s=20 + https://twitter.com/IwriteOK/status/1293413036863025152?s=20 +  blood in photo, but good? news https://twitter.com/MacSmiff/status/1293415898414383109?s=20
^NSFL video of the person falling out
^https://twitter.com/PTNewsnetwork/status/1293414913868693506?s=20
Day 76 - 22:35 PDT - Portland, OR - SnackVan arrives and parked in front of MCSO building.
Day 76 - N/A - Portland, OR - Neighbors across the street of MCSO put up BLM sign https://twitter.com/45thabsurdist/status/1293418977427767297?s=20
Day 77 - 00:45 PDT - Portland, OR - LRAD make annoucnement to stay off MCSO property to a very small remaining crowd
Day 77 - N/A - Richmond, VA - courthouse had windows smashed, because of eviction crisis https://twitter.com/solomonreports/status/1293378495838588928?s=20 + https://twitter.com/ShannonLillyTV/status/1293548258543964166?s=20
Day 77 - 00:10 PDT - ?, IN - cops harassed and arrested Frank on his march today. He was taken to a station and released. Don't think they went through with anything https://www.facebook.com/100011275926869/videos/1178921322493721 (at about 1hr:55min)
Day 77 - 17:29 PDT - Tampa, FL- ???????  person may have been hurt after the cops pushed her down (not clear)
Day 77 - 21:10 PDT - Nashville, TN - State troopers make mass arrests of protesters staging sit-in on state capitol grounds.
Day 77 - 21:27 PDT - Wauwatosa, WI - minor fight in back of the march
Day 77 - 21:37 PDT - Wauwatosa, WI - police show up, but march moves on
Day 77 - N/A - Bend, OR - Protest blocks ICE busses https://twitter.com/AwareMap/status/1293778015953059840?s=20
Day 77 - 22:50 PDT - Bend, OR - Heavily armed police are have arrived to break the blockade
Day 77 - 22:55 PDT - Portland, OR - Fire in front of Federal Court House.
Day 77 - 22:55 PDT - Bend, OR - Feds (CBP/ICE) approaching protestors in Bend OR.
Day 77 - 23:03 PDT - Bend, OR - Feds (CBP/ICE) are also on the opposite side of the buses. Taking Cops who were on the bus off the bus.
DAY 77 - 23:07 PDT - Bend, OR - they just arrested someone / and or started removing people from the bus, and something was thrown at the officers (Liquid)
^ICE agents dragged the detainee through gravel and broken glass barefoot
^https://twitter.com/maiden_oregon/status/1293803127813152768?s=20
Day 77 - 23:18 PDT - Bend, OR - Fed officers open fire on crowd with pepperballs and salt pouch rounds. someone also crashed acar https://twitter.com/GarrettGAndrews/status/1293795775512641538?s=19
Day 77 - 23:18 PDT - Portland, OR - PPB warns crowd to put out fire by Federal court house
Day 77 - 23:25 PDT - Portland, OR - PPB come out of JC to......put out fire i think?
Day 77 - 23:32 PDT - Portland, OR - JC protest declared unlawful as it was blocking the cars coming out of the garage. https://twitter.com/PortlandPolice/status/1293797605286137856
Day 77 - 23:40 PDT - Portland, OR - PPB begin sweep by JC
Day 77 - 23:42 PDT - Portland, OR - violent arrest, tear gas smoke and mace used https://clips.twitch.tv/HealthyWiseNikudonShadyLulu + https://clips.twitch.tv/DeterminedIronicTireDoritosChip
Day 77 - 23:48 PDT - Portland, OR - PPB threatens to hit person if they don't walk faster.
Day 77 - 23:50 PDT - Portland, OR - egg thrown at officers. then short chase, then de-arrest https://clips.twitch.tv/GenerousEmpathicCaterpillarDansGame
Day 77 - 23:50 PDT - Portland, OR - PPB stampede crowd https://clips.twitch.tv/StormyPeppyLapwingPeteZarollTie + https://clips.twitch.tv/ProductiveResourcefulCrowGrammarKing
Day 77 - 23:53 PDT - Portland, OR - officer down by his own mistake, but ok officer fakes injury. protester arrested https://twitter.com/ENDDSeattle/status/1293826235076767744?s=20
Day 77 - 23:56 PDT - Portland, OR - cop covered in milkshake. firework shot at police, vietnam vet + press Mike Hastie hurt again https://twitter.com/GlbBreakNews/status/1293811460196442112?s=20 + https://clips.twitch.tv/TardyCheerfulPassionfruitPeteZarollTie + https://clips.twitch.tv/WonderfulRespectfulPepperoniTwitchRaid
^Mike Hastie hurt https://twitter.com/aria_ahrary/status/1294026161366827010?s=20
Day 77 - 23:57 PDT - Portland, OR - PPB charge again, cops maced? smoke out after https://clips.twitch.tv/FlaccidShakingMinkBlargNaut
Day 77 - 23:59 PDT - Portland, OR - riot declared. then PPB leave 3ish minutes later. At the time it was not clear, but it was to get gas masks on
Day 78 - 00:16 PDT - Portland, OR - Tear gas being used https://clips.twitch.tv/HeartlessKathishTildeHassanChop
Day 78 - 00:22 PDT - Portland, OR - tires on medic van popped + person thrown to ground https://twitter.com/IwriteOK/status/1293812356640735232?s=20 + https://twitter.com/hungrybowtie/status/1293815890274787331?s=20 + https://twitter.com/MrOlmos/status/1293818658213359617?s=20
^https://clips.twitch.tv/TiredPoorJellyfishTebowing
Day 78 - 00:24 PDT - Portland, OR - more tear gas out. shot over crowd so they have to march into it https://twitter.com/MrOlmos/status/1293821400394866689?s=20
Day 78 - 00:25 PDT - Portland, OR - less lethal rubber balls shot from paintball like gun
Day 78 - 00:26 PDT - Portland, OR - PPB blocking the press down a staircase away from the crowd. arrest made https://twitter.com/gravemorgan/status/1293811795191164928?s=20 + https://twitter.com/1misanthrophile/status/1293812124204978176?s=20
Day 78 - 00:35 PDT - Portland, OR - after a 5-10 min pause they PPB push again and smoke. Then tear gas shot up into the air + they load up and "leave" https://clips.twitch.tv/SpoopyBoringPeachRedCoat
Day 78 - 02:02 PDT - Portland, OR - gate is now closed, PPB go inside
Day 78 - 02:07 PDT - Portland, OR - sneaky arrest made
Day 78 - 02:16 PDT - Portland, OR - mace dancer and fight with cops, no arrest https://twitter.com/R3volutionDaddy/status/1293841452712071168
Day 78 - 19:50 PDT - Washington, DC - MPD deploy mace on protesters in DC https://twitter.com/rawsmedia/status/1294103801146814464?s=20 https://twitter.com/occupydc202/status/1294136573911433216?s=20
Day 78 - 19:50 PDT - Washington, DC - MPD make violent arrest DC https://twitter.com/rawsmedia/status/1294103641096413185?s=20
Day 78 - 19:50 PDT - Washington, DC - MPD police kettle protesters (started at 19:15 we later learned) https://twitter.com/oracle_dc/status/1294104565177032704?s=20 + https://twitter.com/ChuckModi1/status/1294104121994145794?s=20
Day 78 - 19:50 PDT - Washington, DC - reports of mass arrests in DC  (we think about 40-50) https://twitter.com/rawsmedia/status/1294108329187442688 + https://twitter.com/ChuckModi1/status/1294108509202776066?s=20
Day 78 - 20:50 PDT - Washington, DC - they are arresting people including 2 press members and 8+ medics. no clear reason why
Day 78 - 20:51 PDT - Washington, DC - Someone had a medical emergency. PIGs stand around and do nothing. ambulance on the way.
Day 78 - N/A - reports MPD are taking people masks as they arrest them https://twitter.com/on_your_marx/status/1294120658981584897?s=20
Day 78 - N/A - MPD make another aggressive arrest https://twitter.com/ptilve/status/1294133404624011264?s=20
Day 78 - 22:20 PDT - Washington, DC - last of the mass arrests in DC
^https://twitter.com/ChuckModi1/status/1294152161031589889?s=20
Day 78 - N/A - St. Paul, MN - Ethiopian Oromo community in St. Paul throw a very festive and dance protest. About the issues in their country.
Day 78 - N/A - Seattle and Portland are both very peaceful. No police responses. Portland only had a small protest tonight
Day 79 - ~17:30 PDT - Milwaukee, WI - Wauwatosa PD cut off a march. then a member of their bike brigade is violently arrested for confronting them. (25min in) https://www.facebook.com/jonathan.brostoff/videos/10107711606291238 + https://twitter.com/RicoReporting/status/1294430782916878339?s=20
Day 79 - 18:15 PDT - Milwaukee, WI - Wauwatosa PD is out in full riot gear. https://twitter.com/BenJordan3/status/1294449218992713728?s=20 + https://twitter.com/ecaseymedia/status/1294444067011559429?s=20
Day 79 - 18:50 PDT - Milwaukee, WI - march moves on
Day 79 - 19:19 PDT - Seattle, WA - SPD arrested someone for tagging the North Precinct and 6-10 officers are now outside North Precinct. Only 20-30 protesters
Day 79 - 19:38 PDT - Seattle, WA - SPD force everyone out of the parking lot then retreat
Day 79 - 20:00 PDT - Seattle, WA - SPD goes inside north precinct
Day 79 - N/A - CPD officers call cop watchers/protesters "professional agitators"
Day 79 - N/A - Portland Hip Hop BLM event completely peaceful
Day 79 - 21:25 PDT - Portland, OR - Portland march to PPA?
Day 79 - 21:29 PDT - Portland, OR - Portland march met with PPB riot line before they even get close https://twitter.com/SimonDavisCohen/status/1294494323673718784?s=20
Day 79 - 21:31 PDT - Portland, OR - PPB LRAD announcement, street is still open get on the sidewalk. https://twitter.com/PortlandPolice/status/1294493196429344768?s=20
Day 79 - 21:38 PDT - Portland, OR - PPB point lightbar at protesters
Day 79 - 21:47 PDT - Portland, OR -  March decides to go another way
Day 79 - 21:53 PDT - Portland, OR - PPB blocks another direction
Day 79 - 22:03 PDT - Portland, OR - PPB blocks another direction
Day 79 - 22:05 PDT - Portland, OR - PPB march at protesters for like 100 feet https://twitter.com/Clypian/status/1294500978020847617
Day 79 - 22:10 PDT - Portland, OR - reports of unlawful declared for rocks and paintballs thrown though none seen on stream. (may be another street, can't hear LRAD on stream) https://twitter.com/1misanthrophile/status/1294501745972789250?s=20
Day 79 - 22:16 PDT - Portland, OR - confirmed Unlawful declared, paint balloons thrown https://twitter.com/Clypian/status/1294502702278299649?s=20
Day 79 - 22:17 PDT - Portland, OR - 1:17 smoke shut up in the air, cops charge and bullrush. very violent push https://twitter.com/Clypian/status/1294504501148180480?s=20 + https://twitter.com/1misanthrophile/status/1294507402188865537?s=20 + https://twitter.com/1misanthrophile/status/1294512095568916486?s=20
Day 79 - 22:19 PDT - Portland, OR - One person arrested. One person tackled and released - Adam Costello Stream. - https://twitter.com/Clypian/status/1294505445260812294?s=20
^another arrest https://twitter.com/SimonDavisCohen/status/1294521785438806018?s=20
Day 79 - 22:25 PDT - Portland, OR - PPB push back to peninsula park then load up https://twitter.com/hungrybowtie/status/1294516591359492097
Day 77 - 22:25 PDT - Seattle, WA - Protestors marching away from Cal Anderson Park.
Day 79 - 22:39 PDT - Portland, OR - protesters left the park dumpster fire in street
Day 79 - 22:41 PDT - Portland, OR - PPB form new riot line and march, smoke shot
Day 79 - 22:51 PDT - Seattle, WA  - SPD following march.
Day 79 - 23:01 PDT - Portland, OR - Random USPS truck on flatbed. - https://twitter.com/TheRealCoryElia/status/1294516768031948800?s=19
Day 79 - 23:07 PDT - Portland, OR - PPB load up?
Day 79 - 23:15 PDT - Portland, OR - new riot line and push including the press for 12 minutes
Day 79 - 23:25 PDT - Portland, OR - PPB load up, Press loses crowd.
Day 79 - 23:30 PDT - Portland, OR - PPB slash truck tires, unclear if they were even a protester. https://twitter.com/MrOlmos/status/1294522081585979393
Day 79 - N/A - semi in new riot line https://twitter.com/1misanthrophile/status/1294526909687017472?s=20
Day 80 - 00:03 PDT - Portland, OR - PPB load up, water bottle tossed
Day 80 - 00:12 PDT - Portland, OR - PPB have blocked the I-5 bridge to PPA? more LRAD unlawful announcements
Day 80 - 00:22 PDT - Portland, OR - Still on I-5 overpass. Another LRAD Unlawful Assembly Announcement.
Day 80 - 00:25 PDT - Portland, OR - Car approaches cop riot line. Cars allowed through the line after a few minutes.
Day 80 - 00:29 PDT - Portland, OR - PPB bull rush protestors. Media left behind again. Slash tires. - https://clips.twitch.tv/KindPoliteMangoSquadGoals
Day 80 - 00:43 PDT - Portland, OR - Cops circle in the neighborhood with lights and sirens https://twitter.com/therealcoryelia/status/1294539796820275200?s=21
Day 80 - 01:05 PDT - Portland, OR - Day Cops maced a protester for shouting at them  (time unclear) https://twitter.com/hungrybowtie/status/1294543634184810496?s=20
Day 80 - 01:26 PDT - Portland, OR - Protesters march up the street. PPB use more LRAD and march them back
Day 80 - 01:28 PDT - Portland, OR - PPB march and mace press and a few protesters on bridge
Day 80 - 01:41 PDT - Portland, OR - Targeted arrest of person on scooter guy with speaker for no reason, very violent bull rush https://twitter.com/Cascadianphotog/status/1294555833146077187 thx @dirtydishes for the link
^https://twitter.com/Cascadianphotog/status/1294555833146077187 scooter warning, rush, arrest
Day 80 - 01:45 PDT - Portland, OR - PPB start calling for tows
Day 80 - 02:10 PDT - Portland, OR -  PPB load up
Day 80 - 02:41 PDT - More LRAD annoucments that it is unlawful....tho nothing has happened and there is like 30 people left
Day 80 - 03:50 PDT - Blessings guy hops into a car told to turn of stream, moment's before there was mention of "needing heavy metal" :sus:
Day 80 - 20:44 PST - Stone Mountain, GA - BLM and Trumpers meet in Stone Mountain, Georgia. Tensions escalating
^https://youtu.be/ICYFDJPp05E
Day 80 - 09:10 PST - Stone Mountain, GA - Protests - Grappling and grabbing between white nationalist and BLM protestors.
Day 80 - 11:27 PST - Juice WRLD being played at Georgia protest :fire:
Day 80 - 09:33 PST - Stone Mountain, GA - Protests - female BLM protester maced by white nationalist protestor and being tended to by medics on site.
Day 80 - 09:37 PST - Stone Mountain, GA - Protests - sticks/flags being swung between BLM protester(s) and white nationalist protestor(s), further macing by white nationalist protestor(s)
^i think blm is actually counterprotesting in this case
Day 80 - 09:40 PST - Lot's of fighting between both sides. 2nd Amendment lovers ready to intervene
Day 80 - 09:55 PST - Stone Mountain, GA - Protests - police/SWAT line pushing forward, moving protestors back.
Day 80 - 09:56 PST - Stone Mountain, GA - 12 shows up in Stone Mountain. Police Chief orders protests to disperse, and a line of SWAT officers with riot shields form a line and advance
Day 80 - 23:15 PST - mline press possible arrest? Kalamazoo (trying to figure out location)
Day 80 - ~14:00 PDT - Portland, OR - bootlicker rally in PDX Lots of bear mace used. 3 shots fired. https://twitter.com/R3volutionDaddy/status/1294738054356246530?s=20 + https://twitter.com/R3volutionDaddy/status/1294742264753709056?s=20 + https://twitter.com/PNWAntifascist/status/1294762156286595073?s=20 https://www.facebook.com/dustin.brandon.4/posts/10103600272108323
^clear video of shots fired, no one hit https://twitter.com/support_pdx/status/1294767961903751168?s=20
Day 80 - 14:50 PDT - Portland, OR - Pipe bomb thrown at BLM protesters https://twitter.com/R3volutionDaddy/status/1294753618147471360?s=20 + https://twitter.com/defendpdx/status/1294753586526580736?s=20
Day 80 - 15:00 PDT - Portland, OR - reports of sniper on parking garage. https://twitter.com/defendpdx/status/1294757008013369344 + all clear https://twitter.com/support_pdx/status/1294763015162617856?s=20
Day 80 - N/A - Portland, OR - Witness to drive by PDX shooting, PPB did nothing https://twitter.com/defendpdx/status/1294758269794136066?s=20
Day 80 - 15:14 PDT - Chicago, IL - large BLM march met with bridge up and CPD being useless https://clips.twitch.tv/ToughUnusualGooseItsBoshyTime
Day 80 - 15:24 PDT - Chicago, IL - CPD and protesters get in shoving match
Day 80 - 15:51 PDT - Chicago, IL - Protesters have formed a umbrella and bike wall https://clips.twitch.tv/GiantOddBaboonTheRinger
Day 80 - 15:54 PDT - Chicago, IL - cops have grabbed some of the umbrellas and bikes https://clips.twitch.tv/StylishFunnyCodDBstyle + https://twitter.com/dudgedudy/status/1294770202765295617
Day 80 - 15:59 PDT - Chicago, IL - riot police are macing a peaceful crowd https://clips.twitch.tv/StupidGentleAlligatorHassanChop
Day 80 - 16:18 PDT - Chicago, IL - CPD do that "Move Back" bike line push. march decides to move on
Day 80 - 17:00 PDT - Seattle, WA - SPD push Cal Anderson Park, reports of arrests.
Day 80 - N/A - Pittsburg, PA - OFF STREAM possible fed abduction in Pittsburg https://twitter.com/samm_bones/status/1294769302348890113?s=20
Day 80 - 17:02 PDT - Chicago, IL - Chicago brawl, CPD shove people, mace used https://twitter.com/delvecchiograce/status/1294786846594142210?s=20 + arrests made https://twitter.com/real_defender/status/1294794730853879810
Day 80 - 17:16 PDT - Chicago, IL - CPD split the group https://twitter.com/delvecchiograce/status/1294790189383135232?s=20
Day 80 - 17:17 PDT - Chicago, IL - dirt and part of march is trapped https://twitter.com/delvecchiograce/status/1294792505595170818?s=20 + https://twitter.com/DominicGwinn/status/1294791318317740032?s=20
Day 80 - 17:22 PDT - Chicago, IL - ordering people to empty backpacks for no reason https://clips.twitch.tv/VictoriousDistinctNewtSoonerLater + https://twitter.com/DominicGwinn/status/1294792483772268550?s=20
Day 80 - 17:42 PDT - Chicago, IL -  some arrests being made. unclear for what. (we later learned 24 arrests were made, 17 officers were "hurt")
Day 80 - N/A - Beverly Hills, CA - someone ripped up a "MAGA flag" and someone threw a punch/tackled someone else. It wasn't on stream. BHPD arrested a black protestor. credit to @skweetis https://www.facebook.com/nameisprecious/videos/3195235213900572/
Day 80 - 20:30 PDT - Portland, OR - march staging at Laurelhurst Park
Day 80 - 21:10 PDT - Portland, OR - march leaves the park
Day 80 - 21:29 PDT - Portland, OR - march met by several motor bike cops just outside MCSO. followed by LRAD announcement's to stay off property. https://twitter.com/MaranieRae/status/1294856228712013825?s=20 (just showing the crowd)
Day 80 - 21:57 PDT - Portland, OR - crowd chanting "every city every town burn the precinct to the ground"
Day 80 - 22:26 PDT - Portland, OR - two protesters run forward and throw cones https://clips.twitch.tv/AliveJollyWeaselOSsloth
Day 80 - 22:43 PDT - Portland, OR - PPB pointing highbeams at protesters
Day 80 - 23:10 PDT - Portland, OR - Far right group American Wolf shows up, gets yelled at then leaves https://twitter.com/SamWDataGuy/status/1294880424800350208?s=20 + https://twitter.com/gravemorgan/status/1294878852775202816?s=20 + https://twitter.com/pdxfrontline/status/1294880278981177344?s=20
Day 80 - N/A - https://twitter.com/MrOlmos/status/1294880291794780163?s=20
Day 80 - 23:22 PDT - Portland, OR - More PPB LRAD stay off property
Day 80 - 23:36 PDT - Portland, OR - Two protesters are tagging the plywood of the building. PPB LRAD announcement to stop https://clips.twitch.tv/HyperCharmingCockroachSSSsss https://twitter.com/RisePDX/status/1294891528460963840?s=20
Day 80 - 23:48 PDT - Portland, OR -  More PPB announcements to not do anything.
Day 80 - 23:49 PDT - Portland, OR - shield wall move up onto property while chanting rage against the machine "fuck you I don't do what you tell me" https://clips.twitch.tv/SmilingPopularMinkSpicyBoy
Day 80 - 23:53 PDT - Portland, OR - PPB LRAD claim people are throwing rocks and objects (they are not throwing rocks) few water bottle and a apples from a nearby tree have been thrown + a street cone https://twitter.com/PortlandPolice/status/1294891191750635525?s=20
Day 80 - 23:57 PDT - Portland, OR -  declared a riot, disperse west
Day 81 - 00:03 PDT - Portland, OR - Tear gas out, bull rush shield wall, assault members of press https://twitter.com/gravemorgan/status/1294893945919385601 +https://twitter.com/MrOlmos/status/1294896664847634432 +https://twitter.com/MrOlmos/status/1294897598852001794?s=20
Day 81 - N/A - CLIP OF THE DAY: Eric https://clips.twitch.tv/SuaveBusyElkBIRB 
^https://clips.twitch.tv/IntelligentPlayfulKuduStrawBeary
Day 81 - 00:03 PST - The Portland Police Bereau unloads their tear gas, riot lines being formed to push back protesters
Day 81 - 00:05 PDT - Portland, OR - mace used on people in driveway
Day 81 - 00:09 PDT - Portland, OR - tires slashed
Day 81 - 00:10 PDT - Portland, OR - wrestle with press member
Day 81 - 00:10 PDT - Portland, OR - shoving press
Day 81 - 00:14 PST - Press getting into cop faces and spitting their frustration at em in Portland, more tear gas.
Day 81 - 00:16 PDT - Portland, OR - PPB smash press members parked car window https://twitter.com/PredatorFiles/status/1294896082397179905
Day 81 - 00:20 PDT - Portland, OR - PPB Load up. march moves on moment later
Day 81 - 12:23 PDT - Portland, OR - PPB is pushing again
Day 81 - 00:24 PDT - Portland, OR - PPB are targeting people to shoot as they march
Day 81 - 00:28 PDT - Portland, OR - Riot vans load up again and take on the peaceful march, more gas out, gas thrown back, pepperballs out
Day 81 - 00:32 PDT - Portland, OR - bullrush and attack press including eric
Day 81 - 00:34 PDT - Portland, OR - more tires popped LRAD rear window smashed
Day 81 - 00:37 PDT - Portland, OR - PPB chase after a random person, make targeted arrest
Day 81 - 00:38 PDT - Portland, OR - shooting at cars again glass breaks
Day 81 - 00:50 PDT - Portland, OR - PPB are surrounding a house https://twitter.com/garedicus/status/1294903746074488833
Day 81 - 00:51 PDT - Portland, OR - more LRAD and PPB march
Day 81 - 00:52 PDT - Portland, OR - arrest man with shield https://clips.twitch.tv/ThirstyAgileSoymilkDogFace credit @dirtydishes
^https://clips.twitch.tv/ThirstyAgileSoymilkDogFace arrest of man with shield
Day 81 - 00:58 PDT - Portland, OR - PPB load up and head back to station
Day 81 - 01:23 PDT - Portland, OR - protester was dancing on the precinct property and the PPB make targeted arrest
Day 81 - 01:26 PDT - Portland, OR - police van drives off? maybe with arrested people
Day 81 - 01:46 PDT - Portland, OR - ppb turn off most of their lights
Day 81 - ~01:49 PDT - Portland, OR - PPB fire smoke into private property https://twitter.com/gravemorgan/status/1294918765197455362?s=20
Day 81 - 02:13 PDT - Portland, OR - civilian car speeds by?
Day 81 - 02:17 PDT - Portland, OR - 4 PPB cars leave lights and sirens blaring. CJ helps clear a road barricade for them
Day 81 - 02:39 PDT - Portland, OR - one arrest for graffiti. also cars being towed
Day 81 - N/A - Portland, OR - officers unprovoked slams person into the street. NSFW https://www.reddit.com/r/Portland/comments/iaoc5c/unreal/
Day 81 - N/A - https://twitter.com/JLJLovesRVA/status/1295174008212803584
^https://twitter.com/JLJLovesRVA/status/1295183197001732100
Day 81 - 20:01 PDT - Richmond, VA - police riot line, unlawful assembly (not clear what led up to it)
Day 81 - N/A - https://twitter.com/BreRVA/status/1295196525262524417?s=20 + https://twitter.com/GoadGatsby/status/1295197110309130245?s=20 + https://twitter.com/GoadGatsby/status/1295201511182565377?s=20
Day 81 - N/A - Richmond, VA -  1 of 2 arrests being made https://twitter.com/edace2936/status/1295207702642266112?s=20
Day 81 - 21:30 PDT - Seattle, WA - Large march (200-300) headed to SPOG hq https://twitter.com/okrrrralexa/status/1295220406735876096?s=20 + https://twitter.com/durrant_kay/status/1295222083828375553?s=20
Day 81 - 09:38 PDT - Seattle, WA - Protesters encounter a SPD sheriff vehicle grabbin some McDonalds or somethin
Day 81 - 21:54 PDT - Portland, OR - "stay woke" chant
Day 81 - 22:04 PDT - Seattle, WA - March rounds corner and is meet with riot line of cop. March then tells cops to "move back"
Day 81 - 22:08 PDT - Seattle, WA - SPD bike cops come from other direction
Day 81 - 22:10 PDT - Seattle, WA - dispersal order
Day 81 - 22:11 PDT - Seattle, WA - March runs behind a building
Day 81 - 22:13 PDT - Seattle, WA - firework tossed, flash bang tossed, NLG pushed https://twitter.com/FirecrowTV/status/1295242437456048130?s=20
Day 81 - 22:14 PDT - Seattle, WA - Seattle cops pushing protesters back from Seattle Officers Guild, with tear gas and flashbangs being used.
Day 81 - 22:21 PDT - Seattle, WA - bull rush, protester arrested
Day 81 - 22:22 PDT - Seattle, WA - another protester arrested
Day 81 - N/A - https://twitter.com/station_static/status/1295232482925658112?s=20
Day 81 - N/A - https://twitter.com/station_static/status/1295232195846496256?s=20
Day 81 - 22:23 PDT - Seattle, WA - Firework thrown and another bull rush.
Day 81 - 22:36 PDT - Portland, OR - white truck crashes into tree? driver taken in ambulance. (reports driver had taken several passes at the protesters and no license plates)
Day 81 - N/A - https://twitter.com/VenturaReport/status/1295233274101424128?s=20 + https://twitter.com/pdxfrontline/status/1295233245513039873 (from before https://twitter.com/PDX_Monitor/status/1295230564505616384)
Day 81 - N/A - https://twitter.com/pdxfrontline/status/1295233946007920641 + https://twitter.com/PDocumentarians/status/1295237718260084736 + NSFL driver removed from car and beaten up(just seen laying on ground herehttps://twitter.com/livesmattershow/status/1295234554454654976?s=20 NSFL driver gets kicked in the head and knocked out I highly highly recommend not watching it https://youtu.be/60cqUPxYThY
Day 81 - 22:38 PDT - Seattle, WA -  march has moved away from cops?
Day 81 - 22:47 PDT - Seattle, WA -  10+ cop cars with lights and sirens are follow Seattle march https://twitter.com/converse_nick/status/1295237988297785344?s=20
Day 81 - 22:57 PDT - Seattle, WA - People move large traffic cones into street, some cops get out to clear them
Day 81 - 23:01 PDT - Seattle, WA - SPD move to kettle again in squad cars
Day 81 - 23:03 PDT - Seattle, WA - SPD officers in riot gear now walking around
Day 81 - 23:04 PDT - Seattle, WA - Truck is now being towed
Day 81 - N/A - after the march cops beat-up anyone suspected of being a protester NSFWhttps://twitter.com/spekulation/status/1295946737069068288?s=20
Day 81 - 23:25 PDT - Portland, OR - PPB riot line shows up and orders people off street, and off the sidewalk. they clear the street between JC and court house (no clear reason)
Day 81 - 23:31 PDT - Portland, OR - PPB load up and leave
Day 82 - 20:10 PDT - Eugene, OR - Lawyer's speech on rights, very useful info
Day 82 - 21:50 PDT - Portland, OR - March from park to "likely" PPA begins
Day 82 - 22:00 PDT - Portland, OR - March arrives at PPA, Marked/unmarked cars spotted : https://twitter.com/PDX_Monitor/status/1295587118627135488?s=19
Day 82 - 22:53 PDT - Portland, OR - Joey Gibson at the PPA. Protestors attempt to escort him out. - https://twitter.com/PortlandPolice/status/1295601150058565633 - https://twitter.com/suzettesmith/status/1295601214428610560
Day 82 - 22:56 PDT - Portland, OR - LRAD making announcements at PPA building. - https://twitter.com/PortlandPolice/status/1295601150058565633
Day 82 - 22:59 PDT - Portland, OR - Joey Gibson gone.
Day 82 - 23:01 PDT - Portland, OR - LRAD announcement to move away from building so officers may inspect.
Day 82 - 23:09 PDT - Portland, OR - PPB Arrests protester
Day 82 - 23:09 PDT - Tear gas time for Portland
Day 82 - 23:22 PDT - Portland, OR - PPB again announces that they believe that protesters are attempting to force entry into the PPA building
Day 82 - N/A - https://twitter.com/IwriteOK/status/1295604614864072709?s=20
Day 82 - 23:26 PDT - Portland, OR - protester(s) have made entry into the rear of the building (exact time unclear) https://twitter.com/NancyRomm/status/1295607876900155394?s=20 + https://twitter.com/TheHannahRay/status/1295606305508343808?s=20
Day 82 - 23:30 PDT - Portland, OR - Protesters part for public bus https://twitter.com/IwriteOK/status/1295609905169092608?s=20
Day 82 - 23:48 PDT - Portland, OR - Letha Winston speaks to the protest at the PPA. - https://twitter.com/IwriteOK/status/1295613593019441152
Day 83 - 00:15 PDT - Portland, OR - Part of the crowd wants to march after hearing Letha Winston. Folks are trying to organize where to go.
Day 83 - 00:25 PDT - Portland, OR - The bulk of the crowd has decided to stick with Demetria Hester. They are still out in front of the PPA. https://twitter.com/IwriteOK/status/1295622534960881666
Day 83 - 02:24 PDT - fire reported at PPB https://twitter.com/matcha_chai/status/1295652737154048001
Day 83 - 02:50 PDT - fire no longer active, 1x Cops, 4x Firefighters on the scene https://twitter.com/FancyJenkins/status/1295659823510372352
Day 83 - N/A - Hot mess on franks stream https://www.facebook.com/100011275926869/videos/1186263355092851/?id=100011275926869
DAY 83 - ~18:15 - ?, OH - Frank Nitty marching to DC
Day 83 - N/A - Group marching down the road came to a stop when road was blocked by around two dozen people claiming to "protect their town from angry people"
^https://twitter.com/mary_plane_jane/status/1295891642277416961
DAY 83 - ~18:20 - ?, OH - Member of Frank Nitty's group was punched by someone from the locals. Attemping to get state troopers who arrived to acknowledge and investigate
DAY 83 - 18:25 - ?, OH - Member of Frank Nitty's group who punched someone using racist language is being ticketed. Still no word on the earlier assault.
Day 83 - 21:45 PDT - Portland, OR - march has arrived at Multnomah Country offices on Hawthorne https://twitter.com/JulesBoykoff/status/1295945973953261568 + https://twitter.com/hungrybowtie/status/1295945832852725760
Day 83 - 22:04 PDT - Portland, OR - large dumpster fire in street
Day 83 - 22:24 PDT - Portland, OR - small paper fire outside
Day 83 - 22:24 PDT - Portland, OR - window smashed in, fire on inside  https://twitter.com/TheHannahRay/status/1295953232934498304?s=20
Day 83 - 22:27 PDT - Portland, OR - fire is out? https://twitter.com/TheHannahRay/status/1295955039345709056?s=20
Day 83 - 22:29 PDT - Portland, OR - PPB LRAD declares a riot https://twitter.com/PortlandPolice/status/1295956154971873281?s=20
Day 83 - 22:30 PDT - Portland, OR - PPB declares an unlawful assembly, threatening tear gas and arrests if protesters/rioters (up to you) don't disperse.
Day 83 - 22:31 PDT - Portland, OR - riot police arrive with masks
Day 83 - 22:32 PDT - Portland, OR - snack van tires slashed https://twitter.com/gravemorgan/status/1295957204567093248?s=20 https://clips.twitch.tv/GloriousHealthyAlpacaImGlitch
Day 83 - 22:34 PDT - Portland, OR - PPB make multiple arrests and are confiscating shields. Pepper spray shield bearer. - https://twitter.com/1misanthrophile/status/1295960133889961985 - https://twitter.com/caicai84407272/status/1295959796424691712 - https://twitter.com/garedicus/status/1295960946565951493
Day 83 - 22:34 PDT - Portland, OR - PPB make multiple arrests and are confiscating shields. And pushing press/protestors out of the area. (cont) - https://twitter.com/1misanthrophile/status/1295962399103545345 - https://twitter.com/hungrybowtie/status/1295963243836407808 - https://clips.twitch.tv/CarefulCoweringTildeHotPokket
Day 83 - 22:45 PDT - Portland, OR - PPB setup a perimeter around the Multnomah Building. - https://twitter.com/PDX_Monitor/status/1295960199895961600
Day 83 - 22:50 PDT - Portland, OR - PPB mount up and disperse.
Day 83 - 22:55 PDT - Portland, OR - Fire Dept on location at Multnomah Building putting out dumpster  urban campfires. - https://twitter.com/PDX_Monitor/status/1295963465643896832
Day 83 - 22:34 PDT - Portland, OR - Continuation of links to arrests/brutality from PPB. - https://twitter.com/Johnnthelefty/status/1295965796426891265
Day 83 - 23:15 PDT - Portland, OR - Protestors arrive Hawthorne and 12th. Trying to organize where to go next.
Day 83 - 23:28 PDT - Portland, OR - Protestors begin marching again.
Day 83 - 23:36 PDT - Portland, OR - PPB formed line to meet protestors. Still a riot. Pushing protestors back away. - https://twitter.com/gravemorgan/status/1295976162041032709
Day 83 - 23:43 PDT - Portland, OR - Potential knockdown of press/phone.
Day 83 - 23:45 PDT - Portland, OR -  Bullrush. DJ LRAD hits Tabitha. Residents yelling out their windows. PPB reported to be slashing tires in residential neighborhood. - https://twitter.com/garedicus/status/1295975906276671488
Day 83 - 23:48 PDT - Portland, OR - PPB mount and leave. No apparent arrests.
Day 84 - 00:05 PDT - Portland, OR - Protestors stop again. Dumpster on fire. PPB roll by with lights/sirens. - https://twitter.com/gravemorgan/status/1295978847398031360
Day 84 - 00:07 PDT - Portland, OR - Protestors begin marching again towards the park.
Day 84 - 00:15 PDT - Portland, OR - Riot van does a drive by - https://twitter.com/hungrybowtie/status/1295982614705127424
Day 84 - 00:30 PDT - Portland, OR - Protest begins to disperse and livestreamers begin to go offline.
Day 84 - 19:16 PDT - Pittsburgh, PA - Police declare protest at Mayor Peduto's house to be unlawful, Police form riot line https://twitter.com/jake_mysliwczyk/status/1296270472087207936 + https://twitter.com/jake_mysliwczyk/status/1296274090156843008?s=20 +https://twitter.com/airreeulll/status/1296272314955444227?s=20
Day 84 - 19:25 PDT - Pittsburgh, PA - march has moved on
Day 84 - 19:30 PDT - Pittsburgh, PA - march met by motor bike officers?
Day 84 - 19:33 PDT - Pittsburgh, PA - bike officers let them thru to Mellon Park https://twitter.com/airreeulll/status/1296273374201749506?s=20 + https://twitter.com/jake_mysliwczyk/status/1296274382852173824?s=20
Day 84 - 19:36 PDT - Pittsburgh, PA - Officers push and shove people into the park off the road, some arrests made https://twitter.com/airreeulll/status/1296274560053018629?s=20 + https://twitter.com/airreeulll/status/1296275284182863875?s=20 + https://twitter.com/PghCurrent/status/1296277241324855298?s=20
Day 84 - 19:37 PDT - Pittsburgh, PA - Mace used https://twitter.com/jake_mysliwczyk/status/1296275421386940418?s=20 + https://twitter.com/csnyderj/status/1296275426059472902?s=20
Day 85 - 20:13 PDT - Richmond, VA - officers return in riot gear https://twitter.com/JLJLovesRVA/status/1296647173740941317?s=20 + https://twitter.com/swampdaddyx/status/1296650766409781250?s=20
Day 85 - 20:40 PDT - Richmond, VA - situation is escalating https://twitter.com/JLJLovesRVA/status/1296651509376180225?s=20 + https://twitter.com/AINYOOOO/status/1296652034976944132?s=20 + https://twitter.com/JLJLovesRVA/status/1296656028965183489?s=20
Day 85 - 20:45 PDT - Portland, OR - PNW Youth Liberation Front march is back at PPA and holding
Day 85 - 20:55 PDT - Richmond, VA - reports cops are leaving in Richmond https://twitter.com/swampdaddyx/status/1296656767540240385?s=20 + https://twitter.com/JLJLovesRVA/status/1296657782700220417?s=20
Day 85 - N/A - Pasadena, CA - after last nights march to the mayors house the PD did release one edited camera angle of the shooting of Anthony McClain but protesters are not ok with just the one and are now camping out infront of Pasadena City Hall till they get all of them
Day 85 - 21:45 PDT - Portland, OR - PNW Youth Liberation Front march is dispersing.
Day 85 - 22:05 PDT - Seattle, WA - jackass has used his car to blocked the car brigade and EDM march in Seattle.
Day 85 - 22:06 PDT - Seattle, WA - car brigade goes around the jackass
Day 85 - 22:36 PDT - Portland, OR - building by ICE building has air horn go off for 5+ minutes.
Day 85 - 22:40 PDT - Portland, OR - protester jumps up on building and disables the air horn
Day 85 - 22:42 PDT - Portland, OR - owner comes out moments later and maces streamer Rosa. his friend in lifted white truck slowly rolls thru crowd threatening them.
Day 85 - 22:46 PDT - Portland, OR - moron building owners friend comes out with stun gun.
Day 85 - 22:47 PDT - Portland, OR - something thrown at moron, he charges with stungun but goes back inside without hitting anyone. https://twitter.com/GriffinMalone6/status/1296686000798699520?s=20
Day 85 - 23:06 PDT - Portland, OR - Federal Protective Service LRAD.... do not damage the building
Day 85 - 23:10 PST - Dope diss track on Portland Police Bereau :fire:
Day 85 - 23:12 PDT - Portland, OR - protesters spray security camera on ICE building https://twitter.com/BGOnTheScene/status/1296691511250173953?s=20
Day 85 - 23:19 PDT - Portland, OR - Feds out in riot gear, push away protesters. https://twitter.com/GriffinMalone6/status/1296693305711792130
Day 85 - 23:19 PDT - Portland, OR - DHS/PPB push out and form a line
Day 85 - 23:23 PDT - Portland, OR - Feds fire Tear Gas and Pepper Balls at protestors to disperse. - https://twitter.com/PDX_Monitor/status/1296695437479608322 - https://twitter.com/GriffinMalone6/status/1296695438880382976 - https://twitter.com/gravemorgan/status/1296696038309244928
Day 85 - 23:23 PDT - Portland, OR - Feds fire Tear Gas and Pepper Balls at protestors to disperse. (cont)-  https://twitter.com/garedicus/status/1296697615443263489
Day 85 - 23:30 PDT - Portland, OR - Feds failed to disperse the protestors. Feds continue to fall back to the building. Protestors continue to follow them back.
Day 85 - 23:33 PDT - Portland, OR - Feds retreat back into the building.
Day 85 - 23:47 PDT - Portland, OR - FedRAD makes more announcements to protestors at the ICE facility. - https://twitter.com/PDX_Monitor/status/1296700084269338624
Day 86 - 00:20 PDT - Portland, OR - DHS/FPS/PPB advance from the ICE building  https://twitter.com/MrOlmos/status/1296713557225046016
Day 86 - 00:22 PDT - Portland, OR - PPB declares unlawful assembly at ICE building.
Day 86 - 00:22 PDT - Dumpster fire seen in distance on Rosa's stream https://twitter.com/griffinmalone6/status/1296709253030273024?s=21
Day 86 - 00:25 PDT - Line advances and leads protesters down the street, better shot of dumpster, DJ LRAD calls for them to move north
Day 86 - 00:33 PDT - Portland, OR - PPB retreats.  Protesters return (obviously).
Day 86 - 00:37 PDT - Portland, OR - DJ LRAD drive-by.  Still an unlawful assembly, disperse north.
Day 86 - 00:43 PDT - Portland, OR - PPB Pushes protesters north. The push turns into a full bull rush.
Day 86 - 00:47 PDT - Portland, OR - PPB mounts up and retreats.
Day 86 - 01:00 PDT - Portland, OR - PPB again advances and pushes the protesters north. LRAD again declares that "this is still an unlawful assembly."
Day 86 - 01:06 PDT - Portland, OR - PPB mounts up and partially retreats. PPB then dismounts down the street and begins to push again.
Day 86 - 01:11 PDT - Portland, OR - DJ LRAD stutters and says OFFICE--OFF-OFF-OFFICERS while addressing protestors. Musical inspiration is born in real time.
Day 86 - 01:15 PDT - Portland, OR - Multiple protesters are violently arrested. LRAD continues to declare "unlawful assembly."  @rain_pdx is among those arrested.
^https://twitter.com/coltshmolt/status/1296724524382093313
Day 86 - 01:27 PDT - Portland, OR - PPB mounts up and retreats.
Day 86 - 14:28 PDT - Orlando, FL - at least one arrest after protesters tried to "unlawfully" cross the street.on intl
Day 86 - 14:34 PDT - Orlando, FL - Protester with broken arm arrested, for stepping on the crosswalk (?)
Day 86 - 17:21 PDT - Tujunga, CA - shouting match between antifa and BTB turns physical, gets seperated by Cop line. Reportedly two arrested antifascists. https://twitter.com/desertborder/status/1296969887441592323
Day 86 - 17:26 PDT - Tujunga, CA - unlawful assembly declared by LAPD, both sides must leave within 15 minutes or rubber bullets will be used.
Day 86 - 17:29 PDT - Tujunga, CA - pink smoke bomb thrown at cops from antifa side, Cops shoot rubber bullets and gas.
Day 86 - 17:56 PDT - Tujunga, CA - 30 minutes after unlawful assembly was declared, Trumpsters are still packing up their cars without being harassed by police.
Day 86 - 18:15 PDT - Tujunga, CA - the last protesters are leaving, presumably towards Pasadena, where a vigil for Anthony McClane is to be held at the PPD.
Day 86 - 18:25 PDT - Overland Park, KS - protesters chanting their demands on the sidewalk opposite the mayor's house are told by cops to leave the residential area. Protesters give themselves 2 minutes for each to decide if they want to stay or leave.
Day 86 - 18:38 PDT - Overland Park, KS - most protesters have stayed. they are now holding their protest on private property a few meters down the street from the mayor's house.
Day 86 - 19:29 PDT - Seattle, WA - black bloc march (c. 50 people) reaches SPD north precinct
Day 86 - 19:42 PDT - Seattle, WA - Seattle weekly Black and Indigenous march may have been declared a riot over a single broken window. (Exact time unclear)
Day 86 - 19:54 PDT - Charlotte, NC - bike cops push people back, mace used.
Day 86 - 20:00 PDT - Charlotte, NC - Arrests, pepper spray after a protester spits at officers. https://twitter.com/queencitynerve/status/1297004840644739072
Day 86 - 20:05 PDT - Charlotte, NC - More pepper spray and arrests.
Day 86 - 21:39 PDT - Portland, OR - March Departs Irving Park. https://twitter.com/PDocumentarians/status/1297030679545278464
Day 86 - 22:07 PDT - Portland, OR - March headed to the north precinct.  https://twitter.com/JulesBoykoff/status/1297037769861038080
Day 86 - 22:14 PDT - Portland, OR - March arrives at the precinct.  https://twitter.com/PDocumentarians/status/1297039972940124161
Day 86 - 22:16 PDT - Portland, OR - PPB LRAD claims people are throwing projectiles. https://twitter.com/BaghdadBrian/status/1297040753458212865?s=20
Day 86 - 22:26 PDT - Portland, OR - now claim people are pointing lasers
Day 86 - N/A - Portland shield wall https://twitter.com/PDocumentarians/status/1297041689924624386?s=20 + https://twitter.com/BGOnTheScene/status/1297042698713497600?s=20
Day 86 - 22:51 PDT - Portland, OR - people pull police tape up to squad cars LRADs tell them to go away
Day 86 - 23:01 PDT - Portland, OR - crowd has moved up. LRAD tells them to move back. police cruser drivers window smashed
Day 86 - 23:08 PDT - Portland, OR - "Majority of this crowd is peaceful and self monitoring so this is not declared unlawful. But there is members of the crowd who are conducting criminal activity." or something along those lines
Day 86 - 23:38 PDT - Portland, OR -  LRAD Targeted arrests will be made for those involved in criminal behavior. The rest of the crowd needs to move away.
Day 86 - 23:52 PDT - Portland, OR - 1 or 2 pepper balls fired at person walking forward
Day 86 - 23:58 PDT - Portland, OR - laser being pointed at cop on roof
Day 87 - 00:02 PDT - Portland, OR - officer walks up with 40mm launcher and then walks back
Day 87 - 00:09 PDT - Portland, OR - front tires have been slashed one car, garbage bin fire 
^https://twitter.com/R3volutionDaddy/status/1297066993023987713?s=20
Day 87 - 00:18 PDT - Portland, OR - tear gas smoke out
Day 87 - 00:30 PDT - Portland, OR - PPB come out and remove two cones off the patrol make a single arrest then retreat
Day 87 - 00:33 PDT - Portland, OR - Dumpster fire has small explosion
Day 87 - 00:34 PDT - Portland, OR - LRAD do not touch patrol cars.
Day 87 - 00:36 PDT - Portland, OR - PPB charge again make 1 or 2 arrests
Day 87 - 01:06 PDT - Portland, OR - crowd moves up in mass, more tires popped on patrol car, water bottles thrown at nothing https://twitter.com/45thabsurdist/status/1297082558400704513?s=20
Day 87 - 01:07 PDT - Portland, OR - ppb moves up, smoke out https://twitter.com/MrOlmos/status/1297088698962477056?s=20 + https://twitter.com/MrOlmos/status/1297089248743452673?s=20
Day 87 - 01:08 PDT - Portland, OR - declared unlawful https://twitter.com/gravemorgan/status/1297083525074542594?s=20
Day 87 - 01:09 PDT - Portland, OR - declared a riot, arrest made https://twitter.com/45thabsurdist/status/1297089574292713473?s=20 
^cop smashed phone of person arrested
^https://twitter.com/_WhatRiot/status/1297085738127769601?s=20 may be a different arrest ^https://twitter.com/MrOlmos/status/1297090939148619776?s=20
Day 87 - 01:11 PDT - Portland, OR - mild charge, flash bang, shoving people to ground then lifting them up and let them go https://twitter.com/MrOlmos/status/1297091862969192448?s=20
Day 87 - 01:16 PDT - Portland, OR - PPB load up after marching 3 blocks at walking pace
Day 87 - 01:25 PDT - Portland, OR - more marching, someone pepper sprayed with contacts in
Day 87 - 01:30 PDT - Portland, OR - PPB load up again https://twitter.com/45thabsurdist/status/1297091717116465153?s=20
Day 87 - 01:49 PDT - Portland, OR - PPB march again slow march, trying to get people on sidwalk
Day 87 - 01:58 PDT - Portland, OR - PPB load up
Day 87 - 02:46 PDT - Portland, OR - Riot van pulls up.  pepperballs fired.  Calling out individuals by their clothes for arrest.
Day 87 - 02:49 PDT - Portland, OR - Press told not to engage and to just record.  LRAD warns car to move down street.  Officer walks up and kicks car as its pulling away.
Day 87 - 02:55 PDT - Portland, OR - LRAD acting funny o.o Riot van loads up and leaves.
Day 87 - 02:59 PDT - Portland, OR - PPB shoot possible underage kid with less than lethal (rubber bullet)
Day 87 - 03:05 PDT - Portland, OR - PPB advances with a group to where medical treatment is being provided.  Not allowing vehicle to take person to the hospital.  Threaten to break windows to arrest the person they just shot after initially saying they wanted to provide medical help.
Day 87 - 03:16 PDT - Portland, OR - PPB loads up on vans and leaves
Day 87 - 03:23 PDT - Portland, OR - Ambulance takes person that was shot by PPB to the hospital
Day 87 - 12:17 PDT - Portland, OR - PPB is asking groups in PDX to separate https://twitter.com/PortlandPolice/status/1297251171204128768
Day 87 - ~13:01 - back the blue people shoot BLM protesters with paintballs and mace them
Day 87 - 13:05 - they're still shooting paintballs
Day 87 - 13:07 - back the blue people throwing hot coffee at BLM
Day 87 - 13:18 - pepper spraying still going on. Also paintballs still being shot
Day 87 - 13:25 - still macing and shooting paintballs
Day 87 - 13:33 - smoke bombs are thrown (not sure by who)
Day 87 - 13:31 - BtB hits BLM protesters with an asp baton and breaks Boberts finger https://twitter.com/IwriteOK/status/1297270144947765248 Bobert confronting the person https://twitter.com/hungrybowtie/status/1297270911981088768?s=20
Day 87 - 13:35 - mace sprayed from Blue lives side
Day 87 - 13:39 - Proud boy group breaks Snack van window and continues trying to destroy the van https://twitter.com/hungrybowtie/status/1297273440517238784?s=19 https://twitter.com/IwriteOK/status/1297273725939675136?s=19
Day 87 - 13:43 - dj lrad continues saying it might be declared an unlawful assembly
Day 87 - N/A - back the blue pulls revolver and aims it at BLM https://twitter.com/PNWAntifascist/status/1297273577184432128?s=19 https://twitter.com/MrOlmos/status/1297273640052912128?s=19
Day 87 - 13:53 - Back the blue may have bats full of nails https://twitter.com/SamHanes16/status/1297272863112617984?s=19 not bats but shields with nails
Day 87 - 14:12 - Back the blue throws fireworks at BLM https://twitter.com/hungrybowtie/status/1297280500436840448?s=19
Day 87 - 14:18 - Back the blue starts to leave
Day 87 - 14:25 - back the blue doesnt care about traffic laws https://twitter.com/PDXzane/status/1297283560475222016 also reports that many have guns in their trucks
Day 87 - 14:51 - unlawful assembly declared once all the right wing back the blue people have left
Day 87 - 14:56 PDT - Portland, OR - Unlawful assembly declared, DHS and PPB are pushing BLM protester's https://twitter.com/PortlandPolice/status/1297289969925406720
Day 87 - 14:53 - right wing people stop local family from returning to their car with guns and batons
Day 87 - 13:09 PDT - back the blue throws explosive at black lives matter which lands on a person's arms and explodes https://twitter.com/GriffinMalone6/status/1297264676154179584?s=19
Day 87 - 17:50 PDT - Beverly Hills, CA - Another very tense protest in Beverly Hills CA between BLM and Bootlickers, short skirmish ends with minor injuries. https://twitter.com/BarnBurnerBaby/status/1297339581235441664?s=20 one person was arrested earlier though unclear for what.
Day 87 - 17:51 PDT - Beverly Hills, CA - Beverly hills PD declare a unlawful assembly cops are in riot gear tells people to disperse
Day 87 - 18:00 PDT - Beverly Hills, CA - Beverly Hills PD and LA Sheriffs form a riot line and slowly push people north.
Day 87 - ~18:00 PDT - Chicago, IL - Protesters breaking a piñata “piggy bank https://twitter.com/MilesKLassin/status/1297339609983188992?s=09 + https://twitter.com/livesmattershow/status/1297339386900688896?s=19
Day 87 - ~18:10 PDT - Chicago, IL - CPD have formed riot line for peaceful crowd. https://twitter.com/ElijahSchaffer/status/1297337412922810368?s=20 + https://twitter.com/ElijahSchaffer/status/1297340855762800640?s=09
Day 87 - 18:19 PDT - Beverly Hills, CA - officers bring water bottles to injured person and medics still no help tho it is unclear how injured they are
Day 87 - 18:20 PDT - Chicago, IL - crowd is marching on now, CPD bike cops leading
Day 87 - 18:22 PDT - Beverly Hills, CA - most of the officers and crowd have left
Day 87 - 18:22 PDT - Olympia, WA - bike police + riot cop have formed a line by _. crowd is peaceful
Day 87 - 18:25 PDT - Charlotte, NC - crowd and police riot line at at future RNC fence line
Day 87 - 18:35 PDT - Charlotte, NC - part of the crowd has split off, pepper spray may have been used unclear by who
Day 87 - 18:37 PDT - Charlotte, NC - the part of the crowd that split off is now being pushed back by 5ish riot cops
Day 87 - 18:41 PDT - Lafayette, LA - Tear gas deployed and police move up. At least one arrest.
Day 87 - 18:46 PDT - Lafayette, LA - Several more arrests.
Day 87 - 18:50 PDT - Charlotte, NC - Bike cops push crowd back, not clear why. 
DAY 86 - N/A - officer in Charlotte kneels on protester https://twitter.com/jefftaylorhuman/status/1296993892726972416?s=20
Day 87 - N/A - Washington, DC -  bike cops "assist" a march, but march is peaceful and calm.
Day 87 - 19:00 PDT - Charlotte, NC - crowd has backed about a block away from the bike cops
Day 87 - 19:05 PDT - Charlotte, NC - crowd is now marching up a  street packed with cars police do not seem to be following
Day 87 - 19:22 PDT - Charlotte, NC - bike cops are back. march move on a few minute later
Day 87 - 19:22 PDT - Charlotte, NC - Motorbike police line (using dirt bikes????)
Day 87 - 19:51 PDT - Detroit, MI - epic musical chanting as usual
Day 87 - 21:39 PDT - Detroit, MI - police riot line charges, arrest made, smoke thrown https://twitter.com/ohnoitslydia/status/1297396456593264640?s=20 + https://twitter.com/ohnoitslydia/status/1297397293063208961?s=20 + https://twitter.com/zachedwards/status/1297403631294189569?s=20
Day 87 - 21:41 PDT - Charlotte, NC - Charlotte PD pepper spray more people for no apparent reason.
Day 87 - 21:44 PDT - Charlotte, NC - Charlotte PD police start to charge someone hurt. Protestors carry them off.
Day 87 - 21:47 PDT - Charlotte, NC - Protestors start to regroup and treat injured. CMPD continue to hold line in intersection.
Day 87 - N/A - Portland, OR - leaving Normandale Park to head to Penumbra Kelly Building, where both PPB and MSCO have offices. https://twitter.com/MollyHarbarger/status/1297387522499084288?s=20 
Day 87 - 21:52 PDT - Portland, OR - Cops cut off the 53rd Ave. overpass so protest is now on a much more winding route to try to get to Penumbra Kelly.https://twitter.com/MollyHarbarger/status/1297395037613875200?s=20
Day 87 - 21:55 PDT - Charlotte, NC - CMPD disperses from the cop riot. Protestors continue to treat wounded and start to call it a night.
Day 87 - 21:58 PDT - Portland, OR - LRAD announcement to stop throwing projectiles and head the opposite direction. PPD threaten violence for walking over the overpass.
Day 87 - 22:03 PDT - Portland, OR - 3rd LRAD announcement for protestors to go the other way.
Day 87 - 22:10 PDT - Portland, OR - Protestors disengage from overpass. Start marching a different route.
Day 87 - 22:27 PDT - Portland, OR - Portland protester go to cars to regroup
Day 87 - N/A - Detroit, MI - Police in Detroit seem to have made a mass arrest including streamer Ethan Lucas who filmed from inside the cop car. We are puzzled how a crowd singing and dancing caused this cop riot https://discordapp.com/channels/200797771664457728/716634478507720774/746967603154649138
Day 87 - ~22:45 PDT - Portland, OR - Portland protestors make it to the Penumbra Kelly Building on 47th and Burnside.
Day 87 - 22:48 PDT - Portland, OR - PPB threatens violence if protestors stand on Penumbra Kelly Building property.
Day 87 - 23:32 PDT - Portland, OR - PPB LRAD claims people throwing objects
^https://twitter.com/PortlandPolice/status/1297421022476382209?s=20
Day 87 - 23:38 PDT - Portland, OR - PPB declares unlawful assembly under pretext of thrown objects and paintballs. - https://twitter.com/PortlandPolice/status/1297423730314899457
Day 87 - 23:41 PDT - Portland, OR - PPB second notification of unlawful assembly.
Day 87 - 23:45 PDT - Portland, OR - PPB charge from the flank with smoke, flashbangs and batons. - https://twitter.com/OmarJimenez/status/1297429440197083136?s=19 - https://twitter.com/gravemorgan/status/1297425500814446592 - https://twitter.com/MrOlmos/status/1297434607885803522?s=20
Day 87 - 23:47 PDT - Portland, OR - PPB make Arrests. - https://twitter.com/gravemorgan/status/1297426266887303170
Day 87 - 23:47 PDT - Portland, OR - PPB slashed tires.
Day 87 - 23:50 PDT - Portland, OR - PPB arrests and pepper spraying. - https://twitter.com/MrOlmos/status/1297436615569113088?s=20
^https://twitter.com/MrOlmos/status/1297443641993003008?s=20
Day 87 - 23:52 PDT - Portland, OR - PPB pushes protestors into a residential neighborhood.
Day 87 - 23:55 PDT - Portland, OR - PPB dropping flashbangs in the neighborhood. - https://twitter.com/1misanthrophile/status/1297430782928023554
Day 87 - 23:58 PDT - Portland, OR - PPB declares riot.
Day 88 - 00:01 PDT - Portland, OR - PPB knocks down NLG observer. - https://twitter.com/1misanthrophile/status/1297434755017789440
Day 88 - 00:02 PDT - Portland, OR - PPB pepper spray media and NLG.
Day 88 - 00:03 PDT - Portland, OR - PPB tackle and pepper spray Arex. Attempt to take off her goggles.
Day 88 - 00:04 PDT - Portland, OR - PPB drop smoke in residential neighborhood.
Day 88 - 00:07 PDT - Portland, OR - PPB mount and leave.
Day 88 - 00:19 PDT - Portland, OR - Protestors are back at the MCSO.
Day 88 - 18:36 PDT - Kenosha, WI - Large crowd gathered in a Kenosha WI outside of Milwaukee where a domestic turned into a officer involved shooting. little more is known at this time. Investigators are seen picking things off the street https://twitter.com/KimShineCBS58/status/1297706459401195520?s=19 +https://twitter.com/KenoshaPolice/status/1297705233322258438 +https://twitter.com/stillgray/status/1297714134612500481?s=20
^VIDEO OF SHOOTING NSFL Like really don't watch it https://twitter.com/davenewworld_2/status/1297698630875385856?s=20
Day 88 - 18:38 PDT - Lafayette, LA - Crowd has kettled the cops it looks like https://twitter.com/aillimaj/status/1297708838729199619?s=20
Day 88 - 18:38 PDT - Charleston, NC - mass amounts of bike cops, unclear if there is a crowd
Day 88 - N/A - Washington, DC - mail protest https://twitter.com/RetiredMaybe/status/1297711080110796800?s=20
Day 88 - 18:38 PDT - Lafayette, LA - riot line and LRAD to disperse
^https://twitter.com/504Doug/status/1297716380947623936?s=20Day
Day 88 - ~19:08 PDT - Kenosha, WI - cop car windscreen has been smashed. from the audio it sounds like several have been smashed https://twitter.com/SCCacti/status/1297717803332534272?s=20 + https://twitter.com/lauren_linder/status/1297719102937628672?s=20 + https://twitter.com/lauren_linder/status/1297721476980842496?s=20
Day 88 - 19:15 PDT - Kenosha, WI - small fire by cop car. Officer down from brick to head. NSFW pic https://twitter.com/sachibub10/status/1297719354314776576?s=20 + video i do not recommend you watching NSFL https://twitter.com/KittyLists/status/1297720875634974720?s=20 +https://twitter.com/lauren_linder/status/1297720275514073089?s=19  Very large police response now
Day 88 - 19:24 PDT - Kenosha, WI - police riot line and crowd face off
^https://twitter.com/stillgray/status/1297724069291278336?s=20
Day 88 - 19:34 PDT - Kenosha, WI - some of the crowd has dispersed, bearcat has arrived
Day 88 - 19:41 PDT - Kenosha, WI - Reports that bus with riot police has a flat https://twitter.com/leowithblues/status/1297725236494897158?s=20
Day 88 - 19:41 PDT - Kenosha, WI - possible gun fire then fireworks 
^audio, nothing seen tho https://twitter.com/4t4r11/status/1297726714273988608?s=20
^person walking down the street with a long gun https://twitter.com/RECONJUNKIE/status/1297727771079315457
Day 88 - 19:44 PDT - Kenosha, WI - reports of police snatching someone not involved and walking home. https://twitter.com/valkyriefalls/status/1297726077163405312
Day 88 - 20:06 PDT - Kenosha, WI - reports Protest heading to the local police station https://twitter.com/4t4r11/status/1297736143820263424?s=20
Day 88 - 20:07 PDT - Kenosha, WI - Kenosha reports of looting now happening
Day 88 - 20:07 PDT - Kenosha, WI - pops?
Day 88 - 20:17 PDT - Kenosha, WI - Charlotte bike cop + riot line
^https://twitter.com/queencitynerve/status/1297732823483383808?s=20
Day 88 - 20:17 PDT - Kenosha, WI - Snipers reported to be on police station roof
Day 88 - 20:25 PDT - Kenosha, WI - Scanner reports rock throwing at south end of police building
Day 88 - 20:29 PDT - Kenosha, WI - mad police sirens
Day 88 - 20:30 PDT - Kenosha, WI -  Riot line in pushing people back + Bearcat on site https://twitter.com/4t4r11/status/1297739884384452608?s=20
Day 88 - 20:32 PDT - Kenosha, WI - Scanner says Bearcat taking rounds, scanner says they are deploying gas
Day 88 - 20:33 PDT - Kenosha, WI - KPD deploy tear gas deployed on stream.
Day 88 - 20:33 PDT - Charlotte, NC - CMPD Bikes charge protestor line. A couple flip their bikes. - https://twitter.com/queencitynerve/status/1297737885978959872
Day 88 - 20:36 PDT - Charlotte, NC - CMPD Bike lines up against protestors.
Day 88 - 20:47 PDT - Kenosha, WI - police using mace, protesters toss firecrackers behind police line
Day 88 - 20:47 PDT - Charlotte, NC - CMPD Bikes start to form up for another push.
Day 88 - 20:47 PDT - Kenosha, WI - Police involved shooting? need better source https://twitter.com/Chicagowise/status/1297742274936397824?s=20
Day 88 - 20:53 PDT - Charlotte, NC - Protesters marching in formation.
Day 88 - 20:57 PDT - Kenosha, WI - large fireworks toward police
Day 88 - 20:58 PDT - Charlotte, NC - CMPD Bikes chasing down protestors. At least one arrest.
Day 88 - 21:00 PDT - Kenosha, WI - Public told to stay home in Kenosha https://twitter.com/Kenosha_News/status/1297743969225515009
Day 88 - 21:05 PDT - Kenosha, WI - Shooting teargas from roof, pepper balls down low
Day 88 - 21:08 PDT - Kenosha, WI - more gas from 6 shooter + more fireworks
Day 88 - 21:14 PDT - Kenosha, WI - Scanner - Shots fired at firetruck?
Day 88 - 21:14 PDT - Kenosha, WI - dump truck on fire
Day 88 - 21:17 PDT - Kenosha, WI - gun shot? may be truck fire related
Day 88 - 21:21 PDT - Kenosha, WI - more gun shots, may be into the air
Day 88 - 21:22 PDT - Kenosha, WI - possible structure fire
Day 88 - 21:25 PDT - Kenosha, WI - multiple city garbage truck windows smashed
Day 88 - 21:28 PDT - Kenosha, WI - same  garbage truck lit on fire https://twitter.com/4t4r11/status/1297753426256896001?s=20 + https://twitter.com/4t4r11/status/1297757473575755777?s=20 + https://twitter.com/MichelleDLondon/status/1297759567464497156?s=20
Day 88 - 21:28 PDT - Kenosha, WI - 2nd and 3rd truck on fire
Day 88 - 21:29 PDT - Kenosha, WI - scanner says multiple gun shots? (may be the same)
Day 88 - 21:31 PDT - Kenosha, WI - SWAT tear gas
Day 88 - 21:35 PDT - Kenosha, WI - scanner 2 looters arrested
Day 88 - 21:40 PDT - Charlotte, NC - CMPD start to push on protestors. pepper spray. CMPD kettle small group.
Day 88 - 21:43 PDT - Charlotte, NC - CMPD Arrests
Day 88 - 21:43 PDT - Charlotte, NC - CMPD Arrests (cont) [placeholder for links]
Day 88 - 21:44 PDT - Kenosha, WI - person with rifle following SWAT truck as it backs away from dump truck fires https://twitter.com/BoogalooBarkeep/status/1297757549614120960?s=20
Day 88 - 21:46 PDT - Kenosha, WI - Fire truck explodes, Kenosha courthouse on fire?
Day 88 - 21:53 PDT - Charlotte, NC - CMPD bicyclists mount up to leave protstors follow and get into altercation with officers forcing them to back out and leave
Day 88 - 21:44 PDT - Kenosha, WI - tear gas from swat vehicle? and maybe gun shots close by or at SWAT Bearcat https://twitter.com/4t4r11/status/1297759789339074560
Day 88 - 21:59 PDT - Louisville, KY - Cars burning out and doing donuts while people have dance party to protest in downtown
Day 88 - 21:20 PDT - Kenosha, WI -  out of order my bad now we have source saying Jacob Blake is in surgery but alive https://twitter.com/DanielPoneman/status/1297750493498941441?s=20
Day 88 - 22:07 PDT - Kenosha, WI - Court house?????
^has been smashed https://twitter.com/4t4r11/status/1297761851330232322?s=20
Day 88 - 22:08 PDT - Portland, OR - dumpster fire (jarridhubtv)
Day 88 - 22:09 PDT - Kenosha, WI - kenosha flames for basement of courthouse south side
Day 88 - 22:09 PDT - Portland, OR - first LRAD announcment
Day 88 - 22:10 PDT - Kenosha, WI - person on ATV driving around dump trucks
Day 88 - 22:14 PDT - Portland, OR - second and third LRAD announcment and officers on roof
Day 88 - 22:16 PDT - Portland, OR - 4th LRAD announcment and uhaul trailer on side on fire and used as barrier
Day 88 - 22:16 PDT - Portland, OR - 1 shot fired by officers off roof (unclear of what)
Day 88 - 22:20 PDT - Kenosha, WI - Kenosha County Courthouse on fire. Potentially second fire. - https://twitter.com/KittyLists/status/1297765871041929216
Day 88 - 22:23 PDT - Portland, OR - Several LRAD warnings for throwing projectiles. NOT declared a riot yet
Day 88 - 22:25 PDT - Portland, OR - protestors chant "kill yourself" to ppb
Day 88 - 22:27 PDT - Denver, CO - 1 protester arrested after small scuffle
^https://twitter.com/TroutBoneless/status/1297766865477885952
Day 88 - 22:29 PDT - Louisville, KY - heavy police presence arrived in KY at downtown dance party
Day 88 - 22:29 - Kenosha, WI - SWAT bearcat being pushed back https://twitter.com/PotempkinBrain/status/1297772461753274371?s=09 + https://twitter.com/FromKalen/status/1297772714011262976?s=20
Day 88 - 22:30 PDT - Portland, OR - LRAD 1st time declared unlawful assembly
Day 88 - 22:31 - Kenosha, WI - smoke/tear gas from APC
Day 88 - 22:32 PDT - Louisville, KY - protestors begin sitting with hands up in middle of intersection infront of heavy police vehicle line (Maxwell Mitchell)
Day 88 - 22:32 PDT - Kenosha, WI - Kenosha PD uses tear gas as rioters smash windows nearby.
Day 88 - 22:31 - Kenosha, WI - riot line next to court house
Day 88 - 22:37 PDT - Louisville, KY - Protesters form line in front of line of LMPD patrol cars.
Day 88 - 22:40 PDT - Portland, OR - 3nd barricade brought in and 3rd fire made ( 2 dumpster fire and 1 uhaul trailer fire) https://twitter.com/hungrybowtie/status/1297770845083820034?s=20
Day 88 - 22:40 PDT - Kenosha, WI Pepper bullets from cops, more tear gas
Day 88 - 22:45 - Kenosha, WI - baton rounds/rubber bullets shot
Day 88 - 22:46 - Kenosha, WI - dispersal order https://twitter.com/LizJone26271417/status/1297776075297054721?s=20
Day 88 - 22:51 - Kenosha, WI -  scanner robery now shooting at gas station, suspect believe to have been shot
Day 88 - 22:48 - Kenosha, WI - rocks/bricks being thrown at windows of downtown buildings: https://twitter.com/FromKalen/status/1297772714011262976?s=09
Day 88 - 22:59 - Kenosha, WI - another large wave of tear gas tho it never really stopped https://twitter.com/lauren_linder/status/1297775472055640065
Day 89 - 00:03 PDT - Kenosha, WI - Riot passes by car dealership.
Day 89 - 00:07 PDT - Kenosha, WI - possible breakin to dealership and stolen car keys?
Day 89 - 00:14 PDT - Kenosha, WI - Protesters start to build a barricade with a trailer. - https://twitter.com/MaxGeopolitics/status/1297795304436035585
Day 89 - 00:21 PDT - Kenosha, WI - Car on fire in the dealership.
Day 89 - 00:25 PDT - Kenosha, WI - reports of feds in the area (may have been boogs?) https://twitter.com/MaxGeopolitics/status/1297798720273055744
Day 89 - 00:27 PDT - Kenosha, WI - cars exploding and multiple cars on fire at dealership https://twitter.com/wlctv_ca/status/1297797991231893504
Day 89 - 00:38 PDT - Portland, OR - PPB rushing out on protestors. Smoke/Gas.
Day 89 - 00:40 PDT - speaker confiscated and speaker guy maced in face https://twitter.com/BGOnTheScene/status/1297803053672800257
^multiple arrests made https://twitter.com/teamsterjd/status/1297801573435707393
Day 89 - 00:47 PDT - Kenosha, WI - Reports of looting in Kenosha. - https://twitter.com/ChicagoCritter/status/1297801308469157889
Day 89 - 00:53 PDT - Kenosha, WI - FD arrives to car dealership. - https://twitter.com/radicallymoder8/status/1297804319710826496
Day 89 - 00:55 PDT - Kenosha, WI - Gunshots heard on CJ's stream. - https://twitter.com/radicallymoder8/status/1297805003348795392
Day 89 - 1:02 PDT - Kenosha, WI - More gunfire or riot rounds in distance
Day 89 - 1:03 PDT - Kenosha, WI - Kenosha - "Kenosha Police Radio confirms they got the armed suspect and have the gun." https://twitter.com/radicallymoder8/status/1297806195198062592
Day 89 - 1:10 PDT - Kenosha, WI - Structure fire.
Day 89 - 1:11 PDT - Portland, OR - protestors kicking "first response security car" and smashes window with rock in Portland https://twitter.com/garedicus/status/1297809063984730112
Day 89 - 1:17 PDT - Portland, OR - ppb comes back out to move protestors and dj lrad claims it remains a riot
Day 89 - 1:19 PDT - Portland, OR - several arrests being made ( atleast 10 arrests)
Day 89 - 1:30 - Kenosha, WI - https://twitter.com/LizJone26271417/status/1297813852470390784 vid - Kenosha - "Streamers Andrew and CJ tried to slow the fire down so it does not reach church. "
Day 89 - 1:39 - Portland, OR - https://twitter.com/PDX_Monitor/status/1297812204671172608 TO - Portland - "1:19AM Pigs push remaining crowd of >20 south and make multiple arrests in what it seems to be their last rush of the night, stopping at NE Roselawn. "
Day 89 - 01:42 PDT - Kenosha, WI - https://twitter.com/radicallymoder8/status/1297815909059330050 vid - "Police radio claims two different instances of gun shots in #Kenosha
Day 89 - 01:47 PDT - Kenosha, WI -  https://twitter.com/suzspencertv/status/1297817262410338304 vid - business fire
Day 89 - 01:49 PDT - Kenosha, WI - At least one firetruck continues to fight large fire involving multiple cars at a dealership that also threatens a nearby church
Day 89 - 01:52 PDT - Kenosha, WI - One of the small business owners whose business was vandalised/looted interviewed
Day 89 - 01:58 PDT - Kenosha, WI - Comments from CJ TV on vandalism/looting "From our experience, it doesn't appear to be intentional, but rather a reaction to the shooting of an unarmed black man (Jacob Blake) earlier today
Day 89 - 02:00 PDT - Kenosha, WI - CJ TV continues to survey damage to business on one street, comments that damage appears to be mostly to windows with limited looting
Day 89 - 02:04 PDT - Kenosha, WI - Riot police re-occupy the courthouse (?) after protesters have largely dispersed
Day 89 - 02:11 PDT - Kenosha, WI - Kenosha City seems to have deployed in force after protestors dispersed. Large numbers of police near the courthouse and multiple fire department vehicles at both the courthouse and dealership (not sure of proximity to each other)
Day 89 - 02:14 PDT - Kenosha, WI - https://twitter.com/mdesisti/status/1297823607180201984 "Multiple city vehicles now on fire in #Kenosha" Repost from earlier
Day 89 - 02:24 PDT - Kenosha, WI - https://twitter.com/radicallymoder8/status/1297824629197692930 vid (only audio is relevant) - Kenosha - "Police scanner states Employees trapped in the back store being looted." Repost from earlier
Day 89 - 02:26 PDT - Kenosha, WI - https://twitter.com/PublicE57530647/status/1297826328008364033 vid - Kenosha - library damage
Day 89 - 02:29 PDT - Kenosha, WI - https://twitter.com/radicallymoder8/status/1297826474737561605 vid - Kenosha - damage at jewelry store
Day 89 - 02:33 PDT - Kenosha, WI - Reports on Kenosha police scanner of people "coming in and out of the liquor store"
Day 89 - 06:00 PDT - Kenosha, WI - Curfew starts and tentions ensue right away. 100 car caravan came from Milwakee. confrontation between protestors and a car under bridge https://twitter.com/leowithblues/status/1298062708974202880?s=20
Day 89 - 06:00 PDT - Kenosha, WI - Jacob Blake protests continue past the 8 PM curfew set tonight. Looting may have started
Day 89 - 06:07 PDT - Kenosha, WI - protestors organizing cars infront of foot march for protection. car caravan seems to have meshed up with foot protestors
Day 89 - 06:11 PDT - Kenosha, WI - fireworks
Day 89 - 06:16 PDT - Kenosha, WI - protestors at courthouse form confrontation line with sherriffs as hellicopter hovers overhead and 2 armoured vehicles roll in
Day 89 - 18:18 PDT - Kenosha, WI - 1 protestor begin throwing objects at sherriff riot line infront of courthouse
Day 89 - 18:26 PDT - Kenosha, WI - multiple water bottles thrown by protestors
Day 89 - 18:28 PDT - Kenosha, WI - poilice respond with pepper bullets
Day 89 - 18:29 PDT - Kenosha, WI - Warning to disperse for throwing items by LRAD
Day 89 - 18:32 PDT - Kenosha, WI - trigger happy pepper balls
Day 89 - 18:34 PDT - Kenosha, WI - tear gas out https://twitter.com/jonaguilar2020/status/1298073146688524290
Day 89 - 18:35 PDT - Kenosha, WI - loud booms heard on woke
Day 89 - 18:45 PDT - Kenosha, WI - green smoke and more teargas infront of courthouse
Day 89 - 18:52 PDT - Kenosha, WI - bricks reported per scanner
Day 89 - 19:04 PDT - Kenosha, WI - multiple fireworks set off by coiurthouse
Day 89 - N/A - https://twitter.com/leowithblues/status/1298081292341444608 TO - Kenosha - "Finally got confirmation on the scanner in #Kenosha that a few Blue Lives Matter protesters are on scene and armed."
Day 89 - 19:25 PDT - large group of protestors confront small police line infront of courthouse
Day 89 - 19:26 PDT - Kenosha, WI -  teargass and pepper balls out right away
Day 89 - 19:27 PDT - Kenosha, WI - riot line falling back after fireworks set off at police line
Day 89 - 19:36 PDT - Kenosha, WI -  after a short calm more tear gas
Day 89 - 19:37 PDT - Kenosha, WI -  1 garbage truck fire starting infront of courthouse following loud booms https://twitter.com/mattsmith_news/status/1298086984515227655
Day 89 - 19:40 PDT - Kenosha, WI - NG /feds in the area https://twitter.com/lowkey0077/status/1298086237056704513?s=20 + https://twitter.com/ElijahSchaffer/status/1298087754132344832?s=20
Day 89 - 19:43 PDT - Kenosha, WI - bearcat vehicle gets blocked by line of protestos and are sprayed with pepper bullets
Day 89 - ~19:45 PDT - Kenosha, WI - One of the SWAT APC's reportedly has a dead battery
Day 89 - 19:53 PDT - Kenosha, WI - LRAD in sonic mode https://twitter.com/ToolFree2point0/status/1298093859537408002?s=20 + https://twitter.com/delvecchiograce/status/1298095171809218562
Day 89 - 19:58 PDT - Kenosha, WI - LRAD turned off
Day 89 - 20:00 PDT - Kenosha, WI - Kenosha PD gets reinforcements at riot line
Day 89 - 20:06 PDT - Kenosha, WI - More LRAD in sonic mode, can be heard 3 miles away https://twitter.com/videographerw/status/1298097266519969792?s=20
Day 89 - 20:07 PDT - Kenosha, WI - literal failed pipe bomb?  on CJ feed https://twitter.com/AtticusOf1606/status/1298095768067346432?s=20 credit to @e.
Day 89 - 20:08 PDT - Kenosha, WI - LRAD turned off
Day 89 - 20:10 PDT - Kenosha, WI - More LRAD in sonic mode and mass tear gas by courthouse https://twitter.com/lowkey0077/status/1298097672059080707?s=20
Day 89 - 20:14 PDT - Kenosha, WI - police APC is being towed
Day 89 - 20:07 PDT - Kenosha, WI - Pipe bomb(?) on CJ Feed https://twitter.com/AtticusOf1606/status/1298095768067346432
Day 89 - N/A - national guard is in now closer we think https://twitter.com/Julio_Rosas11/status/1298094689749475328?s=20
Day 89 - 20:22 PDT - Kenosha, WI -  crowd is now walking down the road, some thru the dealership that burned last night
Day 89 - 20:22 PDT - Kenosha, WI - LRAD finaly turned off
Day 89 - 20:24 PDT - Kenosha, WI - Sike LRAD is back on
Day 89 - ~20:25 PDT - Kenosha, WI - glass being shattered, streetlights being smashed (injures someone below) https://twitter.com/VenturaReport/status/1298101892212547585?s=20
Day 89 - N/A - Kenosha, WI - Protester shot is face with pepper ball, badly hurt. https://twitter.com/lowkey0077/status/1298099858746871809?s=20 + may be related not clear https://twitter.com/TheScoopUSA/status/1298110461003673600?s=20
Day 89 - ~20:32 PDT - Kenosha, WI - LRAD finally turned off after 22 minutes
Day 89 - ~20:34 PDT - Kenosha, WI - Police scanner reporting multiple shootings
Day 89 - ~20:39 PDT - ?, PA - NSFL shooting on franks march? people reported to be hit. video https://twitter.com/Breaking911/status/1298125274647863296?s=20
Day 89 - ~20:38 PDT - Kenosha, WI - Police scanner reporting shots fired at 14th and 60th
Day 89 - 20:40 PDT - Kenosha, WI -Mass volley of gun fire heard on stream, building fully engulfed https://twitter.com/wlctv_ca/status/1298102897700462592?s=20 + when it was lit https://twitter.com/ShelbyTalcott/status/1298107194051887106?s=20
Day 89 - ~20:42 PDT - Kenosha, WI - Police scanner reporting National Guard is moving 4 Humvee toward courthouse
Day 89 - 20:43 PDT - Encounter with armed 3%er types trying to defend buildings
Day 89 - 20:51 PDT - Kenosha, WI - national guard is confirmed to be at the court house https://twitter.com/NewsMarkMcP/status/1298104080456396800?s=20
Day 89 - 20:51 PDT - Kenosha, WI - Probation office on fire. - https://twitter.com/Chronolxgical/status/1298104360594022401 - https://twitter.com/FireBurnBaby187/status/1298107648538279936?s=20 - https://twitter.com/AboveTxEmpire/status/1298108198658899975?s=20
Day 89 - 20:56 PDT - Kenosha, WI - Police Scanner reporting multiple people with 'cans of accelerant'
Day 89 - 20:56 PDT - Kenosha, WI - Probation Office, B&L Furniture and C&M Automotive all on fire
^https://twitter.com/AmendmentAll/status/1298108172109058048
^https://twitter.com/lib_crusher/status/1298107713524846593
^https://twitter.com/lowkey0077/status/1298107651281358853
Day 89 - 21:06 PDT - Kenosha, WI - Report of someone shot. - https://twitter.com/TheScoopUSA/status/1298110461003673600  (may be unrelated)   [pending more info]
Day 89 - 21:00 PDT - Kenosha, WI - Police Scanner 22 and Roosevelt reports of building on fire
Day 89 - 21:10 PDT - Kenosha, WI - More LRAD in sonic mode for about 2-3 min
Day 89 - N/A - Fires pics https://twitter.com/Pro25031/status/1298110828609077248 + https://twitter.com/RichieMcGinniss/status/1298108717817376769?s=20
Day 89 - N/A - statement from medic https://twitter.com/herosnvrdie69/status/1298111507411148802?s=20
Day 89 - 21:17 PDT - Kenosha, WI - Police line moving in.
Day 89 - 21:27 PDT - Kenosha, WI - Building collapse.
Day 89 - 21:31 PDT - Kenosha, WI - scanner: gas line fire.... unclear where. also another building collapses
Day 89 - 21:36 PDT - Kenosha, WI - CJ called out on the scanner for pouring gas when he was not may be rouge radio
Day 89 - 21:38 PDT - Kenosha, WI - more shots fired? - scanner
Day 89 - 21:42 PDT - Kenosha, WI - CJ helps firemen put out small brush fire
Day 89 - 21:43 PDT - Kenosha, WI - scanner notes CJ is putting out fires
Day 89 - 21:51 PDT - Portland, OR - march is at PPA
Day 89 - 21:54 PDT - Kenosha, WI -  Asking dispatcher "can we arrest some of these people?"
Day 89 - 21:57 PDT - Portland, OR - Flag deployed from roof on the PPA building.
Day 89 - 22:02 PDT - Kenosha, WI - Police Scanner reporting people setting library on fire
Day 89 - 22:03 PDT - Portland, OR - Smoke deployed and protestors pushed away from PPA building. Fireworks.
Day 89 - 22:05 PDT - Portland, OR - PPB line pushing protestors down the street and into residential neighborhood.
Day 89 - 22:05 PDT - Portland, OR - Violent arrests. PPB stealing defensive items.
Day 89 - 22:06 PDT - Portland, OR - PPB shoving media around.
Day 89 - 22:09 PDT - Kenosha, WI - KPD continue to attempt to take secure areas for the FD.
Day 89 - 22:10 PDT - Kenosha, WI - two in custody in Kenosha
Day 89 - 22:12 PDT - Madison WI - reports of dumpster fires at solidarity protest in Madison WI https://twitter.com/ehamer7/status/1298120422723117058 + https://twitter.com/ehamer7/status/1298123097418149889 + https://twitter.com/ehamer7/status/1298123591976988672
Day 89 - 22:12 PDT - Kenosha, WI - shots fired again
Day 89 - 22:12 PDT - Portland, OR - PPB fallback to stand guard at PPA building.
Day 89 - 22:17 PDT - Kenosha, WI - KPD continues to stand guard in front of courthouse. - https://twitter.com/katiegnelson/status/1298126509404835840
Day 89 - 22:20 PDT - Kenosha, WI - Stolen ATM found by racine pd in kenosha
Day 89 - 22:15 PDT - Portland, OR - Protestor with megaphone eloquently provides criticism toward the PPB.
Day 89 - 22:23 PDT - Portland, OR - PPB marching down the street towards line of protestors.
Day 89 - 22:16 PDT - Madison, WI - Police retreating from the crowd after a brief truce for the fire department to put out a massive dumpster fire https://twitter.com/drethelin/status/1298126845695668224?s=20
Day 89 - ~22:00 PDT - Portland, OR - PPB declared riot (this happened earlier) - https://twitter.com/PortlandPolice/status/1298124613453410307
Day 89 - 22:28 PDT - Kenosha, WI - windows broken in capitol square https://twitter.com/ehamer7/status/1298129476690337793?s=20
Day 89 - 22:29 PDT - Kenosha, WI - active looting of family dollar
Day 89 - 22:30 PDT - Los Angeles, CA - Protestors downtown LA facing off against line of LAPD.
Day 89 - 22:36 PDT - Madison, WI - A very small group just smashed some  windows of the US Bank Plaza on East Washington Avenue. https://twitter.com/ehamer7/status/1298130381963747329
Day 89 - 22:36 PDT - Portland, OR - Garrison faces off with PPB
Day 89 - 22:36 PDT - Portland, OR - arrest made
Day 89 - 22:37 PDT - Portland, OR -  Someone in a car yells black lives matter and officer sprints over and tried to hit their car for chanting support https://twitter.com/GriffinMalone6/status/1298132255102050306?s=20
Day 89 - 22:41 PDT - Portland, OR - Successful de-arrest and an officer getting maced and chased off. https://twitter.com/GriffinMalone6/status/1298133442245226497?s=20
Day 89 - 23:05 PDT - Los Angeles, CA - Protestors take barricade away from LAPD to build their own barricade. - https://twitter.com/SamBraslow/status/1298139643016142848
Day 89 - 23:08 PDT - Los Angeles, CA - LAPD start to form perimeters around the protestors. - https://twitter.com/SamBraslow/status/1298139974693351424
Day 89 - 23:17 PDT - Portland, OR - PPB makes arrests outside the PPA. - https://twitter.com/tehandy121/status/1298145598709747713 - https://twitter.com/1misanthrophile/status/1298145118965252097
Day 89 - 23:17 PDT - Portland, OR - Violent charge/multiple arrests, tear gas
^https://twitter.com/1misanthrophile/status/1298144192095346688
Day 89 - 23:18 PDT - Kenosha, WI - Boogs on stream again in Kenosha.
Day 89 - 23:19 PDT - Portland, OR - PPB threatening press and giving illegal orders.
Day 89 - 23:20 PDT - Portland, OR - PPB pushes down press. - https://clips.twitch.tv/CoweringColdDonkeyRaccAttack - https://twitter.com/MrOlmos/status/1298145800287993856 - https://twitter.com/GridWideNews/status/1298166729022025729?s=20
Day 89 - 23:25 PDT - Madison, WI - [OFFSTREAM] Police start pushing on protestors. Tear gas out. - https://twitter.com/ehamer7/status/1298144442495508480 - https://twitter.com/wjcioci/status/1298141160360284160
Day 89 - 23:25 PDT - Los Angeles, CA - LAPD forms riot line.
Day 89 - 23:28 PDT - Los Angeles, CA - LAPD begin push in on protestors.
Day 89 - 23:31 PDT - Los Angeles, CA - LAPD and protestors face off in line. Umbrellas and shields up.
Day 89 - 23:32 PDT - Los Angeles, CA - LAPD begins to push with batons. Protest line backs up.
Day 89 - N/A - Kenosha, WI - Cop car reportedly stolen. - https://twitter.com/HustleDez5/status/1298137517833814016
Day 89 - 23:43 PDT - Los Angeles, CA - LAPD remove barricades. - https://twitter.com/SamBraslow/status/1298148948712886272
Day 89 - 23:44 PDT - Los Angeles, CA - Protest declared unlawful assembly by LAPD.
Day 89 - 23:48 PDT - Los Angeles, CA - LAPD begins push with large line of riot cops. - https://twitter.com/SamBraslow/status/1298150874582151168
Day 89 - 23:49 PDT - Los Angeles, CA - LAPD fires smoke to try to disperse protestors from in front of LAPD HQ. - https://twitter.com/SamBraslow/status/1298151794317488129
Day 89 - 23:50 PDT - Los Angeles, CA - LAPD Firing rubber bullets at protest line.
Day 89 - 23:56 PDT - Portland, OR - PPB makes another arrest.
Day 89 - 23:53 PDT - Madison, WI - [OFFSTREAM] Protestors continue to stand against the police. - https://twitter.com/isthmus/status/1298151605993451522
Day 89 - 23:59 PDT - Los Angeles, CA - LAPD fire more rubber bullets into protest line.
Day 90 - 00:04 PDT - Seattle, WA - Protestors marching through the streets of Seattle. Some urban campfires between the march and SPD.
Day 90 - 00:08 PDT - Los Angeles, CA - LAPD moving protestors down street.
Day 90 - 00:09 PDT - Los Angeles, CA - LAPD chasing down folks, doesn't look like they caught them.
Day 90 - 00:10 PDT - Seattle, WA - [OFFSTREAM] SPD moving in on protestors. Arrests. - https://twitter.com/dcatchpole/status/1298155333383155713 - https://twitter.com/ScannersSpd/status/1298150127547236352 - https://twitter.com/zmboop/status/1298149444504805376
Day 90 - N/A - Madison, WI - [OFFSTREAM] Protestors are calling it a night. - https://twitter.com/isthmus/status/1298153868942073856
Day 90 - 00:12 PDT - Portland, OR - Police begin to leave protest area
Day 90 - 00:13 PDT - Portland, OR - Tear gas is deployed as the last police leave the area https://twitter.com/sunnymok/status/1298157869636833280
Day 90 - 00:15 PDT - Los Angeles, CA - Protesters deployed in L (?) shape to combat U shape police formation. Helicopter continues to fly overhead
Day 90 - 00:16 PDT - Los Angeles, CA - Reports of potential kettling; some protesters fleeing - https://twitter.com/SamBraslow/status/1298157493474824193
Day 90 - N/A - Seattle, WA - [OFFSTREAM] Protestors and SPD clash near East Precinct. - https://twitter.com/Damanji57915320/status/1298156011954384896
Day 90 - 00:19 PDT - Los Angeles, CA - Reports that police are not kettling but police reinforcements have arrived
Day 90 - 00:22 PDT - Los Angeles, CA - Some streamers fleeing (unknown reason)
Day 90 - 00:24 PDT - Los Angeles, CA - Group of police rush a group of protesters
Day 90 - 00:26 PDT - Los Angeles, CA - Protestors moving in respond to police advancing
Day 90 - 00:27 PDT - Los Angeles, CA - Reports of protesters kettled, some may be escaping
Day 90 - 00:28 PDT - Los Angeles, CA  - Protester hit with munition
Day 90 - 00:29 PDT - Portland, OR - PPB continue arrests. - https://twitter.com/PDocumentarians/status/1298159766225580032
Day 90 - 00:29 PDT - Kenosha, WI - Police/fire seem to have established large presence; few civilians (non-fire/police), protesters appear to have dispersed
Day 90 - 00:33 PDT - Los Angeles, CA - Group of protesters and streamer moving down street, possibly avoiding/escaping kettle (?)
Day 90 - 00:35 PDT - Los Angeles, CA - Police have significant presence with several vehicles in one location but few protesters appear to be in the area (?)
Day 90 - 00:35 PDT - Kenosha, WI - Reports of burlington coat factory on fire, streamers en route to confirm - confirmed false alarm on fire
Day 90 - 00:37 PDT - Los Angeles, CA - Protesters appear to all be leaving along the same route
Day 90 - 00:44 PDT - Portland, OR - Police leave area with protesters
Day 89 - 22:06 PDT - Portland, OR - PPB shoving media around.
Day 89 - N/A - Kenosha, WI - Random fire and building collapse in Kenosha https://twitter.com/BGOnTheScene/status/1298159726480564226?s=19
Day 90 - 01:09 PDT - Kenosha, WI - scanner two people shot in a drive-by  ambulance on scene  may not be protest related
Day 90 - 01:19 PDT - Kenosha, WI - https://twitter.com/JVarContinental/status/1298173187994218497 "#Kenosha PD scanner reports that there are multiple lights out in the city and 'utilities' are reporting a power grid failure. The extent of the power grid failure (or possible duration of the outage) is not known."
Day 89 - N/A - Some footage from last night 89-90 in Kenosha, fires and gunfire heard https://youtu.be/4kUKYiGY--8
Day 89 - N/A - Cop car stolen in kenoshas last night time unclear https://twitter.com/RichyLovesYou/status/1298149316532396033?s=20
Day 89 - N/A - Madison, WI last night https://twitter.com/OIls102/status/1298440707250823168?s=20
Day 90 - 12:33 PDT - Kenosha, WI - A sacred fence has been built in front of the Kenosha County Courthouse in order to further defend the courthouse from rioters. 
^https://twitter.com/GidTruth/status/1298342746579783680?s=19
Day 90 - 13:56 - Louisville, KY - Multiple arrest during protest https://www.youtube.com/watch?v=cF_Ha35iLxA
Day 90 - 17:50 PDT - Louisville, KY - three arrests made by LMPD. no answers by the cops when being asked why. They're also refusing to give out names and badge numbers. Update: seems it's for weapons posession. https://twitter.com/selfdeclaredref/status/1298425116255281153
Day 90 - ~18:00 PDT - Atlanta GA - things are getting tense, windows broken, smoke deployed https://twitter.com/AcidVitalism/status/1298424476904886277?s=09 https://twitter.com/selfdeclaredref/status/1298423216139010048?s=20 De-arrest https://twitter.com/MattWSB/status/1298427505146236930?s=20
Day 90 - ~18:00 PDT - Madison WI - vigil for Jacob Blake https://twitter.com/SpectrumNews1WI/status/1298432203802718210?s=20
Day 90 - 18:11 PDT - Louisville, KY - LMPD tows non protester's truck and arrests their friend, who was inside McDonalds before, for no obvious reason.
^https://twitter.com/selfdeclaredref/status/1298428587494776833
DAY 90 - N/A - Louisville KY- multiple arrests being made https://twitter.com/selfdeclaredref/status/1298425116255281153?s=19
^https://youtu.be/BXE3ZscLegA
Day 90 - 18:20 PDT - Kenosha, WI - a single National guard member in riot gear is outside the court house https://twitter.com/CommiesLmao/status/1298431177158733826?s=20
Day 90 - 18:30 PDT - Kansas City MO - a sizable and very well organized protest, also giving lessons on protesting
Day 90 - 18:34 PDT - Atlanta GA - placeholder for possible Molotov in Atlanta https://twitter.com/anoncatanoncat/status/1298432157359181825?s=20 + barricade being built in atlanta https://twitter.com/JoshuaPotash/status/1298433732605620224
Day 90 - 18:36 PDT - Kenosha, WI - Crowd has gathered at sacred fence in Kenosha https://twitter.com/NewsMarkMcP/status/1298432729143541763?s=20
Day 90 - 18:40 PDT - Dallas TX - very large march, (first in a while IIRC)
Day 90 - 18:45 PDT - Kenosha, WI -  Fence is being rocked hard https://twitter.com/anoncatanoncat/status/1298441963050598401?s=20
Day 90 - 18:46 PDT - Kenosha, WI -  KPD out on courthouse steps
Day 90 - 18:47 PDT - Kenosha, WI - water bottles being tossed
^https://twitter.com/leowithblues/status/1298436285246377985
Day 90 - 18:50 PDT - Kenosha, WI - LRAD in Sonic mode turned on https://twitter.com/4t4r11/status/1298438462459256833
Day 90 - 18:47 PDT - Kenosha, WI - firework tossed over fence https://twitter.com/WISN_Ben/status/1298438204161433603?s=20
Day 90 - 18:51 PDT - Kenosha, WI - pepper balls i think
Day 90 - 18:51 PDT - Kenosha, WI - LRAD off after 2 min
Day 90 - 18:55 PDT - Kenosha, WI - LRAD on
Day 90 - 18:56 PDT - Kenosha, WI - LRAD off after 2 min
Day 90 - 18:58 PDT - Kenosha, WI - more pepper balls from roof
Day 90 - 18:58 PDT - Kenosha, WI - crowd telling officers to disperse?
Day 90 - 19:00 PDT - Kenosha, WI - LRAD or Speaker telling crowd to disperse this is unlawful assembly and breaks curfew 7pm to 7am
Day 90 - 19:02 PDT - Kenosha, WI - More pepper balls from roof
Day 90 - 19:04 PDT - Kenosha, WI - do not get close to Bearcat that is outside the fence
Day 90 - 19:04 PDT - Kenosha, WI - stay back from fence, riot round shot
Day 90 - 19:06 PDT - Kenosha, WI - something glass thrown or smashed
Day 90 - 19:07 PDT - Kenosha, WI - pepper balls thru fence at people standing around
Day 90 - 19:10 PDT - Kenosha, WI -  LRAD calling out people in crowd, white tank top
Day 90 - 19:12 PDT - Kenosha, WI - tear gas placed inside fence so it blows into crowd,  DJ LSAD yelling at leafblower man
Day 90 - 19:15 PDT - Kenosha, WI - more calling people out
Day 90 - 19:21 PDT - Kenosha, WI - 2 more bearcats arrive next to court house
Day 90 - 19:23 PDT - Kenosha, WI - 4th bearcat arrive from rear sorta kettles, most crowd moves to the right of court house https://twitter.com/OmarJimenez/status/1298449437648400385?s=20 + https://twitter.com/SlightlyOffens/status/1298450199459831809 + https://twitter.com/AFriendlyDad/status/1298448536741142529
Day 90 - 19:23 PDT - Kenosha, WI - flash bang tossed over fence (may be the wrong time -->) https://twitter.com/enbyourself/status/1298463161335590912
Day 90 - 19:24 PDT - Kenosha, WI - gas throw over fence, fire works
Day 90 - 19:26 PDT - Kenosha, WI - do not throw items (claim rocks and hammers)
Day 90 - N/A - Kenosha, WI - reports 5 arrested, groups running with gas cans https://twitter.com/TheScoopUSA/status/1298446128992616449
Day 90 - 19:29 PDT - Kenosha, WI - unload pepper balls on people on fence line, "if you have any more complains call or email your governor that is your best course of action"
Day 90 - 19:30 PDT - Kenosha, WI - LRAD "using a umbrella is a riotus act"
Day 90 - 19:30 PDT - Kenosha, WI - another MRAP cat arrives? (total of 5 APCs)
Day 90 - 19:30 PDT - Kenosha, WI - LRAD sonic mode for less than a min
Day 90 - 19:32 PDT - Kenosha, WI - person pepperballed in back of head https://twitter.com/AFriendlyDad/status/1298448536741142529
Day 90 - 19:35 PDT - Kenosha, WI -  Please go home it appears you are intoxicated and staggering ..... totally not because he was maced or shot with multiple riot rounds
Day 90 - 19:38 PDT - Kenosha, WI - firework shot at APC/fence
Day 90 - 19:43 PDT - Kenosha, WI - LSAD disperse "final warning"
Day 90 - 19:44 PDT - Kenosha, WI - LRAD sonic mode , Shield wall https://twitter.com/BotchlaUS/status/1298451702656503808?s=20
Day 90 - 19:45 PDT - Kenosha, WI - may be second LRAD in sonic mode
Day 90 - 19:46 PDT - Kenosha, WI - tear gas out, and tossed back https://twitter.com/delvecchiograce/status/1298452136586600450?s=20
Day 90 - 19:48 PDT - Kenosha, WI - cops moving back away from fence likely to go outside, MRAP tried to move is blocked by people https://twitter.com/delvecchiograce/status/1298452955935449090?s=20 + https://twitter.com/ElijahSchaffer/status/1298452554087632896?s=20 + https://twitter.com/ShelbyTalcott/status/1298459660018647041?s=20
Day 90 - 19:50 PDT - Kenosha, WI - LRAD really panicing about those people close to MRAP , think LRAD Sonic mode turned off around here
Day 90 - 19:55 PDT - Kenosha, WI - Police riot line  outside fence
Day 90 - 19:55 PDT - Kenosha WI - DJ LRAD declared riot
Day 90 - 19:56 PDT - Kenosha, WI - push to clear park, LOTS of tear gas https://twitter.com/delvecchiograce/status/1298455355261886469?s=20 +
DAY 90 - 19:59 PDT - Kenosha, WI - Press finally demanded to move and police riot line moves forward into crowd in park https://twitter.com/delvecchiograce/status/1298456325609918468
Day 90 - 20:01 PDT - Kenosha, WI - mass tear gas being blown towards cops https://twitter.com/delvecchiograce/status/1298456325609918468?s=20
Day 90 - 20:04 PDT - Kenosha, WI - protester hurt and being carried https://twitter.com/Sanitizedeye/status/1298456790493884416?s=20
Day 90 - ~20:05 PDT - Kenosha, WI - scanner: Dino museum may have been broken into, back door (3 peeps entered 2 males, 1 female)
Day 90 - 20:10 PDT - Kenosha, WI - Lousiville Metro PD charge? unclear what lead up to it https://twitter.com/brookelharris/status/1298457925837561856?s=20 + https://twitter.com/TylerWHAS11/status/1298458116284133376?s=20 + https://twitter.com/seuntheactivist/status/1298458403761803266?s=20 + 
^person run over/ hit by squad car then LMPD charge?
^https://www.facebook.com/maxwellamitchell/videos/10219351963573439/ 1hr 54 min
Day 90 - 20:10 PDT - Louisville, KY- cop may have struck a civilian in KY and then lied about it cop hit woman with  car in maxwell stream and then lies about it -4:00 from end of stream  https://twitter.com/fascistanista/status/1298460648364478466?s=21 
Day 90 - 20:10 PDT - Louisville, KY- swarm of cops rush over to cop who hit a girl with car after protestors are yelling at him
Day 90 - N/A - Kenosha, WI - person hit in back of head with rubber bullet https://twitter.com/M3ddi3/status/1298457681141825536?s=20
Day 90 - 20:16 PDT - Kenosha, WI - Scanner - Cops setting up to clear Dino Museum
Day 90 - 20:16 PDT - Kenosha, WI - Scanner - Cops say they do not enough to clear dino, then say they do
Day 90 - 20:19 PDT - Kenosha, WI - More tear gassed deployed by Kenosha police
Day 90 - 20:22 PDT - Louisville, KY- LPD LRAD declares unlawfulassembly
Day 90 - 20:25 PDT - Kenosha, WI - Most of the crowd has now moved on from Dino museum, CJ notes you can smell accelerants in the air
Day 90 - 20:26 PDT - Anchorage, AK - Protest organized in AK (in the rain nonetheless), first I'm aware of
Day 90 - 20:31 PDT - Louisville, KY - riot line created on street of person struck by police vehicle
Day 90 - 20:31 PDT - Kenosha, WI - scanner: Kenosha PD note several long guns in crowd
Day 90 - 20:32 PDT - Kenosha, WI - Group of protestors sitting on ground with arms up in front of police line
Day 90 - 20:40 PDT - Kenosha, WI - Tear gas and pepper balls out to protest line. Lots of gas hitting press. Riot line moves and clears protestors in the road. - https://twitter.com/delvecchiograce/status/1298466315259314177?s=20 - https://twitter.com/TheScoopUSA/status/1298466348197187590?s=20
^https://twitter.com/AzazelNews/status/1298469211279253504?s=20 + ^https://twitter.com/AzazelNews/status/1298469934826008577?s=20
Day 90 - 20:46 PDT - Kenosha, WI - Scanner FBI bearcat???? https://twitter.com/odinsbane/status/1298466739756335109?s=20
Day 90 - 20:46 PDT - Kenosha, WI - CJ + other press takes gas  round directly
Day 90 - 20:49 PDT - Kenosha, WI - Police scanner reports people pushing dumpsters
Day 90 - 20:50 PDT - Kenosha, WI - Kenosha declared riot. [pending] - https://twitter.com/ElijahSchaffer/status/1298468451686678531?s=20
Day 90 - 20:50 PDT - Louisville KY - cop riot line breaks up and hundreds of cops move out in formation of 3 wide https://twitter.com/seuntheactivist/status/1298468907171352576
Day 90 - 20:55 PDT - Kenosha, WI - Views on stream of armed people on roof of car dealership building; they possibly threw tear gas
Day 90 - 20:59 PDT - Kenosha, WI - Police scanner: reports of vehicles unloading people clad in all black
Day 90 - 20:59 PDT - Louisville, KY - https://twitter.com/seuntheactivist/status/1298468907171352576?s=20
Day 90 - 20:59 PDT - Kenosha, WI - APCs moving up x4
Day 90 - 21:00 PDT - Madison WI - very large protest https://twitter.com/thepublicpen1/status/1298467266212835329?s=20
Day 90 - 21:04 PDT - Kenosha, WI - Pepperballing fence. unclear what they are shooting, also people behind road barricade. one hit in head
Day 90 - 21:06 PDT - Kenosha, WI - lots tossed at APCs
Day 90 - 21:08 PDT - Kenosha, WI - Police scanner: reports of shots fired (5 shots on 10th avenue, away from stream location)
Day 90 - 21:10 - Kenosha, WI - fire lit on traffic cone kenosha
Day 90 - 21:11 - Kenosha, WI - protestors gather at gas station kenosha, multiple long guns seen
Day 90 - 21:12 PDT - Kenosha, WI - Verbal altercation between armed protester(s) (and counter-protester?) at gas station
Day 90 - 21:12 - Kenosha, WI - fire put out and tension between coutner protestors with guns and BLM
Day 90 - 21:12 - Kenosha, WI - dumspter fire gas station https://twitter.com/delvecchiograce/status/1298473605290954753?s=20
Day 90 - ~21:20 - Madison WI - Activist Anthony Cooper just intercepted a guy who tried walking off onto the mall with a baseball bat. Is still trying to calm him down. https://twitter.com/AJBayatpour/status/1298474650989735936?s=20
Day 90 - 21:21 PDT - Kenosha, WI - Police scanner: Fire at tire store (?) but being contained by store owners  https://twitter.com/anoncatanoncat/status/1298477716405182464?s=20
Day 90 - 21:23 PDT - Kenosha, WI - Tire fire in middle of tire store lot; scanner reports it needs to be put out; some people on stream looking for fire extinguisher to fight it; police and/or FD on the way; confirmed to be controlled burn that owner was aware of
Day 90 - 21:28 PDT - Kenosha, WI - Riot line moving down and dispersing folks down the road. Appear to be protecting area for FD.
Day 90 - 21:30 PDT - Kenosha, WI - Police scanner: reports of shots fired
DAY 90 - 21:30 PDT - Kenosha, WI - police presence and police line push tire fire and scanner states fire is being put out with fire extenguisher
DAY 90 - 21:26 PDT - Kenosha, WI - wrong order.  more tear gas https://twitter.com/delvecchiograce/status/1298477036273631232?s=20
Day 90 - 21:34 - Kenosha, WI - possible fire at pizza hut per scanner 30th and roosevelt
Day 90 - 21:35 - Kenosha, WI - fireworks out at gastation
Day 90 - 21:37 - Kenosha, WI - 2 bearcats arrive at gas station
Day 90 - 21:40 - Kenosha, WI - house evacuated behind pizza hut dumpster fire per scanner https://twitter.com/Abith_2itb/status/1298480086597931013?s=20
Day 90 - 21:43 PDT - Portland, OR - march is at City hall tonight with DEFUND art work https://twitter.com/teamsterjd/status/1298481226085367808 + https://twitter.com/PDocumentarians/status/1298481068626960384?s=20
Day 90 - N/A - carlot on fire https://twitter.com/alienarmpits/status/1298481799769796608
Day 90 - 21:46 PDT - Los Angeles, CA - Streams begin in LA
Day 90 - 21:49 PDT - Portland, OR - LRAD tooo no one? "unlawful assembly at city hall", but LRAD is at JC
Day 90 - 21:50 PDT - Kenosha, WI - Protesters moving (in reaction to police advancing?)
Day 90 - 21:51 PDT - Kenosha, WI - munitions fired, at least one protestor hit (chest); munitions appears to be riot round or possibly live round
^gun shot victim in chest. 2 bearcats and multiple units on scene ^https://twitter.com/Julio_Rosas11/status/1298484633143775234?s=20 
^audio 1 https://twitter.com/TonyAtkinsTV/status/1298483412555182080 
^audio 2 https://twitter.com/ShelbyTalcott/status/1298483483896090625 NSFW VID ^https://twitter.com/Julio_Rosas11/status/1298484633143775234?s=20 
^Cop clears hand gun laying in street
Day 90 - 21:53 - Kenosha, WI -  lrad orders crowd to clear gas station and scanner calls for reinforcments
^scanner suspenct male possible white green shirt long rifle https://twitter.com/CommiesLmao/status/1298483703879008257 
^cj "watcjed him shoot 2 more people"  one of the militia guys
^protestors guess it was a militia with ar 15 and green shirt. one "arm blown half off"
^car on fire
Day 90 - 22:00 PDT - Kenosha, WI - scanner suspicions activity near correctional facilities
Day 90 - 22:01 PDT - Kenosha, WI - Police scanner: two shooting suspects detained; one outstanding
Day 90 - 22:03 PDT - Portland, OR - Portland PPB clear street and LRAD now plays unlawful assembly order they recorded earlier. Door was left unlocked, protesters checked then entered, then lobby windows smashed. https://twitter.com/sunnymok/status/1298483932585893888?s=20 + https://twitter.com/PDocumentarians/status/1298485436042502150?s=20 + https://twitter.com/teamsterjd/status/1298498013908701184?s=20
Day 90 - 22:15 PDT - Kenosha, WI - scanner Male White, Khaki Shorts, Orange Backpack
^https://twitter.com/Bone_Crusha/status/1298487230516920320
^another clip of shooting  https://twitter.com/CommiesLmao/status/1298488694207389697?s=19  
Day 90 - 22:18 PDT - Portland, OR - PPB charge and makes multiple arrests (cont). - https://twitter.com/oh_rome/status/1298495008291479553?s=20 - https://twitter.com/oh_rome/status/1298506089692934145?s=20
Day 90 - 22:22 PDT - Kenosha, WI - scanner "do we have a K9 in the back of the correctional facility?"
Day 90 - 22:23 PDT - Kenosha, WI - Kenosha tear gas out
Day 90 - 22:23 PDT - Portland, OR - PPB and MCSO line continues to fire impact munitions and pepper balls.
Day 90 - 22:27 PDT - Los Angeles, CA - LASD start to form a line in front of protestors.
Day 90 - 22:41 PDT - Los Angeles, CA - LASD rolls in bus. Protestors start forming their line. Deploy barrier that looks to be quick deploy razor wire.
Day 90 - 22:48 PDT - Kenosha, WI - shooter may have barricaded in a nearby house, need better source
Day 90 - 22:48 PDT - Portland, OR - protesters have now marched from city hall to Justice center
Day 90 - 23:04 PDT - Kenosha, WI  - more pops in distance
Day 90 - 23:06 PDT - Los Angeles, CA - LAPD has put out 3 foot rapid deploy razor wire? in front of the riot cops
Day 90 - 23:09 PDT - Portland, OR  - Portland back at city hall
Day 90 - 23:12 PDT - Portland, OR - More LRAD by city hall, unlawful, disperse
Day 90 - 23:14 PDT - Madison, WI - window smashed, employee confronts crowd https://twitter.com/telldylan/status/1298504147013185537?s=20
Day 90 - 23:16 PDT - Portland, OR - riot delcared, very yellow tear gas, out PPB push, arrests made
Day 90 - 23:17 PDT - Portland, OR - yellow teargas deployed
Day 90 - 23:23 PDT - Portland, OR - part of crowd at JC?
Day 90 - 23:23 PDT - Portland, OR - tires slashed by JC
Day 90 - 23:24 PDT - Portland, OR - more gas
Day 90 - 23:25 PDT - Portland, OR - 1 arrest
Day 90 - 23:25 PDT - Portland, OR- riot van mounts up and leaves after slashing tires
Day 90 - ~23:28 PDT - Madison, WI - https://twitter.com/ehamer7/status/1298504305033523201 + https://twitter.com/ehamer7/status/1298505991210893313
Day 90 - ~23:30 PDT - Madison, WI - Madison -Police are coming in full force as the crowd heads onto UW-Madison’s campus. https://twitter.com/ehamer7/status/1298506732684095489
Day 90 - 23:38 PDT - Los Angeles, CA - LAPD appear, protestors change route.
Day 90 - 23:32 PDT - Portland, OR - great interview on AssfaultPirates
Day 90 - 23:47 PDT - Los Angeles, CA - Protestors meet LASD. Shield line formed. Rubber bullets fired.
Day 90 - 23:49 PDT - Los Angeles, CA - LASD throws gas and flashbangs on protest line. Looks to have targeted NLG.
Day 90 - 23:50 PDT - Los Angeles, CA - Protestors kept marching after being fired upon by LASD.
Day 90 - 23:55 PDT - Los Angeles, CA - LA protestor injury, protestors surround to protect and medic is attending.
Day 90 - 23:57 PDT - Portland, OR - LRAD ..... riot blah blah blah
Day 91 - ~00:06 PDT - Portland, OR - targeted arrest + mace "for not being press", this person helps Teebs https://twitter.com/tehandy121/status/1298516896967319552?s=20
Day 91 - 00:16 PDT - Portland, OR - PPB load up
Day 91 - 00:18 PDT - Portland, OR - short chase and arrest in park by JC https://clips.twitch.tv/ProtectiveRespectfulLlamaChefFrank
Day 91 - 00:21 PDT - Los Angeles, CA - LA Protestors pass LAPD HQ.
Day 91 - 00:27 PDT - Portland, OR - PPB knock over cascadianphotog.
Day 91 - 00:28 PDT - Portland, OR - PPB roll out.
Day 91 - 00:35 PDT - Los Angeles, CA - LA march ended.
Day 90 - N/A - 68 people were arrested in Louisville https://youtu.be/BXE3ZscLegA
Day 90 - N/A - NSFL yesterday in SA cops  killed Sergeant Damian Lamar Daniels in front of his home. His family asked the Red Cross to get him to the VA.
^He had a legal gun on his hip that he never removed. He didn’t want to go and he struggled when they tried to force him. 
^So they killed him.  https://twitter.com/MeritLaw/status/1299115830777577474?s=20
Day 91 - 16:30 PDT - Kenosha, WI  - Per Scanner: 10 People in custody,  multiple gas cans in vehicles (Blacked out school bus and "older ups truck") https://www.facebook.com/brittany.booker.927/videos/1690206937803497
Day 91 - 17:44 PDT - Minneapolis MI - Police roll out
Day 91 - 18:03 PDT - Kenosha, WI  - Police scanners reporting another group moving construction equipment
Day 91 - 18:39 PDT - Minneapolis, MN - Unlawful assembly declared
Day 91 - 18:55 PDT - Minneapolis MN - trashcan thrown at police car and officer hit in the neck and was knocked unconsious near looting of footlocker
Day 91 - 18:55 PDT - Minneapolis MN - teargas/mace and escalation tactics coming from MPD
Day 91 - 19:05 PDT - Gresham, OR - Stream Gresham PD seperates protestos and counter protestors in gresham
Day 91 - 19:24 PDT - Gresham, OR -protestors and counter protestors seperated by a street yelling at eachother from across the street
Day 91 - 19:26 PDT - Lincoln, NE - march is growing
Day 91 - 19:34 PDT - Gresham, OR - LRAD warnings
Day 91 - 19:42 PDT - Gresham, OR - wall of moms show up
Day 91 - 19:51 PDT - kenosha, WI - marching
Day 91 - 19:54 PDT - Minneapolis, MN - another unlawful assembly declared, cyclist shot with marker round
Day 91 - 19:56 PDT - Minneapolis, MN - talks of a curfew declared by mayor effective 4 mintes from now.
^https://twitter.com/JulieNelsonKARE/status/1298813445219983360
Day 91 - 20:01 PDT - Minneapolis, MN- mayor requested NG and state patrol may be on the way (pending)
Day 91 - 20:02 PDT - Minneapolis, MN - cops begin dispersing crowd with marker rounds.
Day 91 - 20:03 PDT - Minneapolis, MN - police shoot marker rounds at potential looters from just feet away, they run out and away from Brueggers
Day 91 - 20:08 PDT - Lincoln, NE - march ends and gathers to a speaker
Day 91 - 20:11 PDT - Minneapolis, MN -crime tape minneapolis and snatch van spotted behind
Day 91 - 20:13 PDT - Kenosha, WI - Protesters stopped at 22 and 52. Discussion on where to go next
Day 91 - 20:16 - Minneapolis, MN - multiple shots heard (at S 8th St x 2nd Ave S). cops have live guns out, aiming at people passing by.
^https://twitter.com/UrgentAlertNews/status/1298822809565659136 
Day 91 - 20:18 PDT - Minneapolis, MN - flash grenade out after shooting
Day 91 - 20:18 PDT - Minneapolis, MN - SWAT spotted after shots fired
Day 91 - 20:25 PDT - Kenosha, WI - Protesters headed west on 52nd towards Municipal Courthouse
Day 91 - 20:26 PDT - Kenosha, WI - Protesters stop briefly under overpass near 13th and 52nd. Police lights ahead
Day 91 - 20:25 PDT - Oakland, CA - stream starts, crowd listening to speaker
Day 91 - 20:34 PDT - Minneapolis, MN -police line pushing people away from police crime scene tape and people yelling at them
Day 91 - 20:35 PDT - Minneapolis, MN -flashbangs out towards small amount of people, not even a goup? just throwing into street around random civilians
Day 91 - 20:35 PDT - Kenosha, WI - Protesters are back at the County Courthouse
Day 91 - 20:38 PDT - Minneapolis, MN - group of maybe 5 people seen running and then flashbang went off
Day 91 - 20:40 PDT - Minneapolis, MN - large groups of people running saying dont shoot
Day 91 - 20:50 PDT - Minneapolis, MN - officer called out unicorn riot by name after rushing a protestor who was yelling at him, officer told protestor "your becoming a problem" and then shot him with marker round after he de arrested himself
Day 91 - 20:51 PDT - Minneapolis, MN -multiple fireworks set off
Day 91 - 20:53 PDT - Minneapolis, MN - big groups running away after bricks thrown into glass
Day 91 - 20:54 PDT - Minneapolis, MN - curfew announcment on text
Day 91 - 20:52 PDT - Oakland, CA - About 200 protesters are now leaving Oscar Grant/Frank Ogawa Plaza. https://twitter.com/allaboutgeorge/status/1298830672778244097?s=20
Day 91 - 20:56 PDT - Minneapolis, MN - pepper balls out at scattered people
Day 91 - 20:56 PDT - Oakland, CA - Protesters now marching in the streets chanting and some are lighting fireworks: https://twitter.com/LizJone26271417/status/1298831587593687040?s=20
Day 91 - 20:59 PDT - Oakland, CA - Protesters chanting 'Jacob Blake' in solidarity with the Kenosha police shooting.  https://twitter.com/dpi_19/status/1298832057775222784?s=20
Day 91 - 21:02 PDT - Minneapolis, MN - boogaloo boys call themselves bouja baleen, said they are there to protect protestors from stream. benjamin ryan teeter said he was part of MN boogs branch https://www.quickapedia.com/boojahideen
Day 91 - 21:05 PDT - Minneapolis, MN - large groups running into holiday inn express, just more cat and mous chases, state troopers and MPD sweeping block by block
Day 91 - 21:06 PDT - Minneapolis, MN - arrest made, probably for curfew violation
Day 91 - 21:08 PDT - Oakland, CA - March gets to OPD HQ.
Day 91 - 21:11 PDT - Oakland, CA - OPD threatens to declare unlawful assembly due to protestors shaking a fence. - https://twitter.com/selfdeclaredref/status/1298838998224338944?s=20
Day 91 - 21:15 PDT - Kenosha, WI - Protesters hold vigil at last nights shooting location (63rd and Sheridan)
Day 91 - ~21:20 PDT - Oakland, CA - Oakland marches away from OPD HQ.
Day 91 - 21:28 - Okland, CA - less lethal munitions deployed by possible security gaurd, crowd returned with fireworks and crowd moves on a minute later
Day 91 - 21:35 - ?, PA - Supporters waiting for the march have chalked supportive phrases on the road ahead. Beautiful moment for them, hugs and support.
Day 91 - 21:43 PDT - Oakland, CA - first sign of property damage and trash fire lit https://twitter.com/kellyfrosted/status/1298843959305920513?s=20
Day 91 - 21:45 PDT - Seattle, WA - seattle stream up. SPD present
Day 91 - 21:46 PDT - Oakland, CA - Protesters chanting Breonna Taylor's name while marching down Broadway back to the plaza: https://twitter.com/teresa/status/1298843651833917440?s=20
Day 91 - 21:46 PDT - Kenosha, WI - Scanner reports of shots being fired at 25th and 75th  https://twitter.com/greenetoo/status/1298844547779162113
Day 91 - 21:53 PDT - Oakland, CA - shop windows crashed, but no looting
Day 91 - 21:56 PDT - Kenosha, WI - Protesters marching in residential area chanting "Out of your house" "Into the streets"
^https://twitter.com/Julio_Rosas11/status/1298847933211828225
Day 91 - 21:58 PDT - Oakland, CA - cops are following the march, deploy gas at the rear. more windows are being broken in the front.
Day 91 - 22:02 PDT - Oakland, CA - cops get reinforcements, now a massive group following the march.
Day 91 - 22:05 PDT - Oakland, CA - More fireworks being shot off: https://twitter.com/Desire_xoxoxo/status/1298848887512457217?s=20
Day 91 - 22:07 PDT - Los Angeles, CA - LA March moving.
Day 91 - 22:09 PDT - Oakland, CA - small burning barricade erected across the road, the march keeps moving
^https://twitter.com/selfdeclaredref/status/1298850209347362822
Day 91 - 22:10 PDT - Oakland, CA - Protesters in the back of a pick up truck are lighting sage as they continue to march (now close to 19th station): https://twitter.com/LizJone26271417/status/1298850084096884738?s=20
Day 91 - 22:17 PDT - Oakland, CA - UPS Shop windows being removed
Day 91 - 22:15 PDT - Portland, OR - Feds arrive in Portland to protect ICE building
Day 91 - 22:24 PDT - Oakland, CA - cops try to divert the march onto the freeway with roadblocks.
Day 91 - 22:29 PDT - Oakland, CA - protesters try moving into a residential area but are cut off by a roadblock, move through a park to avoid being kettled.
Day 91 - 22:30 PDT - Kenosha, WI - Police Scanner - Police reporting citizens with long rifles on their property ask police what kind of armour are they wearing (16th Street). Claim they are protecting their property.
Day 91 - 22:30 PDT - ?, PA - walking through the city, met small verbal resistance. Great to watch Frank and company handle adversity through dialogue.
Day 91 - 22:35 PDT - Oakland, CA - the march is now on the freeway
Day 91 - 22:38 PDT - Oakland, CA - protesters are now blocking the freeway in both ways, but letting ambulance and singular cars pass.
Day 91 - 22:43 PDT - Portland, OR - cop "is injured" after being hit with an egg or bouncy ball https://clips.twitch.tv/AgileTangentialClamMcaT
^https://clips.twitch.tv/AltruisticLittleApeRickroll
Day 91 - 22:43 PDT - Seattle, WA - Police  aggressively arresting and pushing crowd off roads into bushes
^https://twitter.com/LizJone26271417/status/1298859616525094913
Day 91 - 22:44 PDT - Portland, OR - unlawful assembly declared by FPS over thrown eggs
Day 91 - 22:43 PDT - ?, PA - Group of locals/counter protesters as the Nitty group walks by. A member of the locals aimed a rifle at the Nitty group. Frank asks officer to intervene or they will go back. Edit: Group circled back towards them and officers finally pushed the locals away from the direct area. Got a little tense but sorted out quickly and Frank and group were back on the way. Stream cut out not too long after for a reset.
Day 91 - 22:46 PDT - Portland, OR - cop line (DHS) moving forward, pepperballs and green gas deployed. cops stop their advance after maybe 20 meters, taking one junction.
Day 91 - 22:50 PDT - Oakland, CA - the group left the freeway and is now marching through a residential area.
Day 91 - 22:54 PDT - Los Angeles, CA - Protest march meet LAPD in the tunnel where they are kettled and shot with rubber bullets. - https://twitter.com/_preciouschild/status/1299207955447910400?s=20
Day 91 - 22:55 PDT - Kenosha, WI - Police Scanner - Police scanner reporting armed guards at St James Church claim to be hired to protect property, however, claims St James has not hired anyone
Day 91 - 22:56 PDT - Oakland, CA - the group has been trapped/kettled
Day 91 - 22:56 PDT - Portland, OR - PPB moving forward one block, using green gas/smoke and less lethal ammunition again
Day 91 - 23:05 PDT - Los Angeles, CA - LAPD stating that if you have a shield you need to surrender.
Day 91 - 23:06 PFT - Oakland, CA - according to Jmal Omari, no arrests are being made, protesters are released from the kettle one by one.
Day 91 - 23:07 PDT - Kenosha, WI - Police Scanner - "Armed people on 64th. Appear armed but not doing anything"
Day 91 - 23:15 PDT - Portland, OR - Violent arrests
^https://clips.twitch.tv/TastyCrispyJalapenoPJSalt
^https://clips.twitch.tv/RealCaringSushiMikeHogu
Day 92 - 21:12 PDT - Washington, DC - cars are being let out of Whitehouse event.
Day 92 - 21:16 PDT - Seattle, WA - EDM is at SPOG (union) president Mike Solens house
Day 92 - N/A - Portland, OR - The Ninth Circuit has temporarily suspended order protecting legal observers and journalists from federal officers
Day 92 - N/A - In the 2-1 decision, Judges Daniel Bress and Eric Miller, both Trump-appointed, wrote the restrictions would "cause irreparable harm" https://twitter.com/Rjaellis/status/1299173669705363458
Day 92 - 21:27 - Los Angeles, CA - BLM protesters reach the chief of police's house https://twitter.com/TheScoopUSA/status/1299201568030457861
Day 92 - ~21:30 PDT - Sacramento, CA - Sacramento sheriffs department windows smashed and building tagged https://twitter.com/Captain_Hooks/status/1299200885147361280?s=20
Day 92 - 21:30 PDT - Washington, DC -  White man in Blackface shows up on BLMPlaza is protected by police, but a protester is arrested. https://twitter.com/BGOnTheScene/status/1299201748981215233 + https://twitter.com/ChuckModi1/status/1299202962699489280
Day 92 - 21:32 PDT - Washington, DC - DC very tense https://twitter.com/jordylancaster/status/1299202963655790594?s=20 + https://twitter.com/rawsmedia/status/1299204327844843520?s=20
Day 92 - 21:45 PDT - Sacramento, CA - after a march through downtown, where several police and city buildings were attacked 
^https://twitter.com/LauraHaefeli/status/1299168615749488640
^https://twitter.com/LauraHaefeli/status/1299200653353340934
^https://twitter.com/LauraHaefeli/status/1299207860644007936
^protesters reach the state capitol, sorrounded by level 0 fence, massive cop presence in the building's shadows and on the front yard. Protesters make rounds around  the capitol, chanting.
Day 92 - 21:45 PDT - Washington, DC - De-arrest https://twitter.com/anoncatanoncat/status/1299207095095619585?s=20
Day 92 - 21:45 PDT - Washington, DC - DC chasing Trump supporting congressman, Police decided that crowd is a threat and are shoving people back https://twitter.com/nu1wcf/status/1299216493679390721?s=20
Day 92 - 22:17 PDT - Sacramento, CA - arrest made: cops rush from the yard and grab one person from the sidewalk
Day 92 - 21:17 PDT - Washington, DC - DC police stacking up?
Day 92 - 21:21 PDT - Washington, DC - DC chase arrest? failed
Day 92 - 21:22 PDT - Washington, DC - mace used by cop on another cop missing the girl they were aiming for https://twitter.com/anoncatanoncat/status/1299217622538616832?s=20
Day 92 - 21:42 PDT - Sacramento, CA - ABC 10 is sent away, 5 minutes later the speeches end, people go home.
Day 92 - 21:46 PDT - Seattle, WA - Every Day March Seattle ends
Day 92 - N/A - Kenosha, WI - several arrests in Kenosha, Al Araby TV team and Kevin  Glowicki threatened with arrest if they don't leave the park.
Day 92 - 23:30 PDT - Washington, DC - bike police have ridden away after holding a line for a while. notes that they were quickly called to a location
Day 92 - N/A - Englewood Cliffs, N.J. - teen who held Black Lives Matter protest gets hit with $2,500 bill for police overtime https://www.nj.com/bergen/2020/08/nj-teen-who-held-black-lives-matter-protest-gets-hit-with-2500-bill-for-police-overtime.html?outputType=amp&__twitter_impression=true
Day 93 - 08:21 PDT - Frank Nitty speaking in DC after marching 750 miles from Milwaukee. 
^https://www.youtube.com/watch?v=RPPCmMvZcok
Day 93 - 08:31 PDT - Congresswoman Ayanna Pressley's speech in DC.
Day 93 - 08:35 PDT - Rep. Adriano Espaillat's speech in DC.
Day 93 - 08:38 PDT - Rep. Charles Booker's speech in DC.
Day 93 - 08:43 PDT - Tylik McMillan's speech in DC.
Day 93 - 08:50 PDT - Rev. Dr. W. Franklyn Richardson's speech in DC.
Day 93 - 08:54 PDT - Civil Rights Activist Maya Berry's speech in DC.
Day 93 - 08:58 PDT - Dr. Jamal Bryant's speech in DC.
Day 93 - 09:02 PDT - Congresswoman Shelia Jackson Lee's speech in DC
Day 93 - 09:10 PDT - Congresswoman Joyce Beatty's Speech in DC
Day 93 - 09:15 PDT - Members of the AFL-CIO: President of the American Federation of Teachers Randi Weingarten, National President of AFGE Everett Kelley, and General President of IUPAT speeches in DC.
Day 93 - 09:25 PDT - Chair of the Democratic Committee Tom Perez's speech in DC.
Day 93 - 09:30 PDT - A virtual appearance by Kamala Harris.
Day 93 - 09:33 PDT - President and CEO of the National Urban League Mark Morrell's speech in DC.
Day 93 - 09:38 PDT - Congressman Al Green introduces Martin Luther King III.
Day 93 - 09:41 PDT - Yolanda Renee King's (MLK Jr.'s granddaughter) speech in DC. https://twitter.com/nowthisnews/status/1299388984343310336?s=20
Day 93 - 09:46 PDT - Martin Luther King III's speech in DC.
Day 93 - 10:06 PDT - Reverend Al Sharpton's speech in DC.
Day 93 - 10:27 PDT - Mother of Breana Taylor
Day 93 - 10:29 PDT - Brother of George Floyd, F__+ Sister Bridget
Day 93 - 10:41 PDT - Jacob Blake's sister
Day 93 - 10:43 PDT - Jacob Blake's father? i think
Day 93 - 10:47 PDT - Milwaukee Attorney Ivy Lamont? (not sure on the spelling)
Day 93 - 10:51 PDT - Father of Joel Acevedo
Day 93 - 10:54 PDT - singer B B ?????
Day 93 - 11:00 PDT - Attorney Chris Stuart
Day 93 - 11:00 PDT - mother and sister of Botham Jean?
Day 93 - 11:04 PDT - Mother of Ahmaud Aubrey
Day 93 - 11:06 PDT - Attorney Lee Merritt
Day 93 - 11:08 PDT - Father of Ahmaud Aubrey
Day 93 - 11:10 PDT - Sebrina Fulton
Day 93 - 11:12 PDT - Eric Garner Jr
Day 93 - 11:13 PDT - Mother + Father of Oscar Grant. Ronda Johnson?
Day 93 - 11:15 PDT - Mother of Dontre Hamilton
^Also present, but did not get a chance to speak the familys of Stefan Clark, Mike Brown, Sylville Smith, Philip Penel?, Montez hambrin?, Emanuel Lee (I may have spelled those wrong)
Day 93 - 11:18 PDT - Washington, DC - crowd lines up to march around DC and to MLK memorial
Day 93 - ~12:00 PDT - Washington, DC - the march official ended..... tho in reality nothing changed
Day 93 - 15:36 PDT - Washington, DC - march heads through tunnel near the freeway
Day 93 - 15:46 PDT - Washington, DC - protestors link up and block cars outside of tunnel while cops on bikes watch
Day 93 - 15:52 PDT - Washington, DC - After 6 minutes protestors continue to march in the rain and end confrontation with blocking cars
Day 93 - 15:54 - Washington, DC - protestors link arms and march up off ramp in pouring rain and thunder
Day 93 - 15:56 PDT - Washington, DC - some protestors seek refuge from rain and thunder under bridge and are confronted by line of bike cops
Day 93 - 16:41 PDT - Raleigh, NC - Large crowd gathers in protest
Day 93 - ~16:00 PDT - Kenosha, WI - Large protest marching down the street (Unsure of number but looks to be at least 100 people)
Day 93 - 16:47 PDT - Raleigh, NC - small fire in raleigh (possible flag?)
Day 93 - 16:48 - Raleigh, NC - crowd begins massive march
Day 93 - 17:34 PDT - New Port Richey, FL - Nina is arrested for refusing to sign a second citation she got for talking into the megaphone too loud. a group of protesters moves to the jail to demand her release.
Day 93 - 17:55 PDT - New Port Richey, FL - Protester got a warning for "amplified noise"
Day 93 - 18:03 PDT - New Port Richey, FL - a gaggle of proud boy bikers (Blue Thunder Bike Gang) passes by and stops on the other side of the street to get off their bikes. a standoff ensues, seperated by a cop line.
Day 93 - 18:19 PDT - San Diego, CA - pepperspray used, arrests made
Day 93 - 18:29 PDT - San Diego, CA - protesters disengage from cops
Day 93 - 18:29 PDT - New Port Richey, FL - protesters disengage from bikers
Day 93 - 19:24 - Raleigh, NC - People are leaving the protest site at the capitol, followed by LRAD threatening arrest.
^https://twitter.com/LeighTauss/status/1299528062619582464
^https://twitter.com/LeighTauss/status/1299535285731184640
^1951 arrests in raleigh? (aerial view, hard to tell, looking for clips)
Day 93 - 19:50 PDT - San Jose, CA -  100 or so protesters gathered in front of city hall: https://twitter.com/Scoop_Johnson/status/1299538321463365633?s=19
Day 93 - 2002 - person on ground, arrest?
Day 93 - 20:04 PDT - Sacramento, CA - SPD grouped together in City Hall around the corner from a planned solidarity protest at Cesar Chavez Plaza: https://twitter.com/ZachFuentesTV/status/1299544090598453249?s=19
Day 93 - 20:15 PDT - Raleigh, NC - multiple arrests made, among the detained are NLG observers.
^https://twitter.com/ashad_hajela/status/1299550842958290944
^https://twitter.com/WNCN/status/1299553565900451840
^journalists told they have to obey curfew, too.
^https://twitter.com/ashad_hajela/status/1299548222281650176
Day 93 - 20:10 PDT - San Jose, CA -  Protesters chanting in front of city hall: https://twitter.com/Scoop_Johnson/status/1299544488499490816?s=09
Day 93 - 20:19 PDT - Sacramento, CA - Police vehicles parked in a line being sketchy right now: https://twitter.com/VickiGonzaleztv/status/1299547017903968257?s=09
Day 93 - 20:28 PDT - San Jose, CA - Protestera take to the street to march : https://twitter.com/Scoop_Johnson/status/1299548999863599104?s=19
Day 93 - 20:47 PDT - Oakland, CA - the BLM march is being escorted by a long line of riot cops
^https://twitter.com/LizJone26271417/status/1299555879952343042?s=19
Day 93 - 21:07 PDT - Oakland, CA - "Wakanda Forever" is projected onto a Downton building in honor of Chadwic Boseman: https://twitter.com/SantiagoMejia/status/1299558558397202437?s=19
Day 93 - 21:19 PDT - Denver, CO - pepperballs, off-meta smells CS-Gas, about 5 minutes before their ultimatum ran out.
^https://twitter.com/RyanHaarer/status/1299558952321998855
^https://twitter.com/RyanHaarer/status/1299559351363883009
Day 93 - 21:22 PDT - Denver, CO - teargas and more pepperballs
^https://twitter.com/RyanHaarer/status/1299566133738049536
Day 93 - 21:15 PDT - San Jose CA - Protesters dancing in the street: https://twitter.com/Scoop_Johnson/status/1299559044651405314?s=09
Day 93 - N/A - Oakland, CA- Tear gas deployed onto protesters: https://twitter.com/rolandlisf/status/1299563796273324034?s=19
Day 93 - 21:25 PDT - Denver, CO - swat coming in, protesters leave the PD
Day 93 - 21:25 PDT - San Diego, CA - skirmish between cops and protesters
Day 94 - 02:36 - Portland, OR - PPB take down crime scene tape
Day 94 - 12:04 PDT - New Port Richey, FL - 5th citation for BLM for "amplified noise" in the park today, ca. 11 cops deliver the 500$ ordinance
Day 94 - 12:10 PDT - New Port Richey, FL - trespass warning issued
Day 94 - 12:10 PDT - New Port Richey, FL - protesters are leaving the park for a march through the city
Day 94 - 12:47 PDT - New Port Richey, FL - counterprotest against BLM by 5 BTB people shows up
Day 94 - 12:51 PDT - New Port Richey, FL - one of the now 6 BTBs is flashing his gun, others are turning on their car alarm
Day 94 - 13:05 PDT - New Port Richey, FL - cops show up, talk to the man with the gun, then the BLM protesters. 4 cops seperate the groups now, mostly facing BLM
Day 94 - 13:18 PDT - East LA, CA - Chicano Moratorium March has reached their destination at the Whittier Boulevard Historic Landmark Sign:  https://t.co/Ql6REP0PyP: https://twitter.com/el_tragon_de_LA/status/1299803603989749762?s=19
Day 94 - 13:48 PDT - New Port Richey, FL - BTB protester in a Jason mask shows up, they're maybe 12 now, more keep showing up
Day 94 - 14:09 PDT - New Port Richey, FL - BLM is leaving and going home
Day 94 - 14:49 PDT - Charleston, ? - march of about 120 people has been kettled, cops say everyone will be arrested, 5 arrested so far
Day 94 - 16:03 PDT - Portland, OR - chuds use pepperspray https://twitter.com/ByMikeBaker/status/1299845102815248384
Day 94 - 16:15 PDT - Portland, OR - BLM retreats https://twitter.com/ByMikeBaker/status/1299847204442578944
Day 94 - 17:10 PDT - Portland OR-Trump Rally raises flag @ Clackamas Town Center: https://twitter.com/RPeavyhouse/status/1299861773051256832?s=20
Day 94 - 17:13 PDT - Crowd cheers "Four More Years" and "USA": https://twitter.com/PDXzane/status/1299862407267799040?s=20
Day 94 - 17:14 PDT - Woman on horse with Trump flag; speaker asks the crowd to "pray for (our) president": https://twitter.com/PDXzane/status/1299862583113998338?s=20
Day 94 - 17:15 PDT - A sole BLM protester walks through the Trump Rally: https://twitter.com/RPeavyhouse/status/1299863168525635584?s=20
Day 94 - N/A - Protester is harassed by Trump supporters as she walks through the crowd: https://twitter.com/TheRealCoryElia/status/1299865162560581632?s=20
Day 94 - N/A - Some sort of road rage incident involving a few Trump supporters: 
^https://twitter.com/RolloWV/status/1299878054899134465?s=20
Day 94 - 17:16 PDT - Trump rally is now march with semitrucks leading the way: https://twitter.com/PDXzane/status/1299863156936728577?s=20
Day 94 - 17:36 PDT - Crowd sings "God Bless the USA": https://twitter.com/MrAndyNgo/status/1299868576338255873?s=20
Day 94 - 17:41 PDT - BLM protesters now seen marching: https://twitter.com/faizsays/status/1299869561441796096?s=20
Day 94 - 17:52 PDT - Both groups are now in proximity and are starting to engage each other: https://twitter.com/JenDowlingKoin6/status/1299872685040627712?s=20
Day 94 - 17:56 PDT - Chicago, IL - Cops stop the march to get everyone on the sidewalk. people do not want to get on the sidewalk.
Day 94 - 18:03 PDT - Chicago, IL - protesters continue their march on the sidewalk
Day 94 - 17:10 PDT - Portland, OR - BLM protestors are now crossing lanes on highway to physically block the pro-Trump motorcade march: https://twitter.com/mcbc/status/1299881417166512128?s=20
Day 94 - 18:13 PDT - Arrest on Hiram's stream?
Day 94 - 18:14 PDT - Portland, OR - Riot cops in portland arrest people including trumpet guy https://twitter.com/nezumi_ningen/status/1299882187408449536?s=20
Day 94 - 18:17 PDT - Kenosha, WI - 2 arrests in kenosha, one for hitting a pole with a car while weilding a machete, one presumably for not obeying curfew
^https://twitter.com/TheScoopUSA/status/1299881810038534144
^https://twitter.com/KimShineCBS58/status/1299884867245633537
Day 94 - N/A - Portland, OR - BLM protesters are blocking cars involved in Trump rally.
Day 94 - 18:17 PDT - Trump supporter in white truck attempts to run over BLM protesters: https://twitter.com/Texantana/status/1299878589765226496?s=20
Day 94 - 18:19 PDT - Trump supporters 'dancing' on their car: https://twitter.com/TheScoopUSA/status/1299879050673090560?s=20
Day 94 - 18:24 PDT - BLM protesters still holding in attempt to block the motorcade rally from advancing: https://twitter.com/fascistanista/status/1299880678050365440?s=20
^https://twitter.com/angie_laughing/status/1299912590844284929?s=20
Day 94 - 19:01 PDT - Portland, OR - car in the Trump convoy hit someone, doesn't stop (K.D. Williams, Streamworks)
Day 94 - 19:46 PDT - Portland, OR - trumpster in pdx gets out of his car looking for a fight, doesn't find one https://twitter.com/MrOlmos/status/1299903222576898049
Day 94 - 19:55 PDT - Portland, OR - punches thrown BLM protester goes down
^https://twitter.com/ByMikeBaker/status/1299904156442869760 
Day 94 - 19:59 PDT - Portland, OR - another fight, chud bleeding
Day 94 - 20:00 PDT - Portland, OR - bycicle run over, cyclist seems to be alright, motorist is allowed to leave 
^https://twitter.com/ByMikeBaker/status/1299905598192939008
^https://twitter.com/garedicus/status/1299908007208329216
Day 94 - 20:06 PDT - Portland, OR - press assaulted https://twitter.com/justadog/status/1299906190713913344
Day 94 - 20:18 PDT - Portland, OR - trumpsters use paintballs and maze against BLM
^https://twitter.com/ByMikeBaker/status/1299909726231171072
^https://twitter.com/TheRealCoryElia/status/1299908378810957825
Day 94 - 20:24 PDT - Washington DC - arrest made
Day 94 - 20:28 PDT - Washington DC - gas/smoke and flashbangs, people are moving back from the fence
^https://twitter.com/abdallah_fayyad/status/1299911615006081025
Day 94 - 20:29 PDT - Portland, OR - riot cops show up, BLM clears the junction, at least one arrest
^https://twitter.com/Apex_WW/status/1299912548440068097
Day 94 - 20:32 PDT - Washington DC - more maze, gas and flashbangs in dc
^https://twitter.com/rawsmedia/status/1299911910427688962
Day 94 - 20:34 PDT - Washington DC - cop line in dc pushes down the street, stops at blm plaza junction
^https://twitter.com/rawsmedia/status/1299913596042907648
Day 94 - 20:36 PDT - Portland, OR - small BLM group at the intersection is kettled
Day 94 - 20:40 PDT - Washington DC - cops clear junction at BLM plaza 
^https://twitter.com/rawsmedia/status/1299915344367300608
^https://twitter.com/rawsmedia/status/1299912826874667010
Day 94 - 20:45 PDT - Portland, OR - cops from the small kettle leave after the trump parade has passed
Day 94 - 20:46 PDT - Portland, OR - shots fired, from red car, one person was shot three times "definetly dead" - Assfault Pirates 
Day 94 - N/A - nytimes article https://twitter.com/ByMikeBaker/status/1299939511971921923
Day 94 - N/A - clip from around the corner: https://twitter.com/ElijahSchaffer/status/1299921762168246273?s=20 
Day 94 - N/A - CW: pictures https://twitter.com/_WhatRiot/status/1299917408241500160 
Day 94 - 20:45 - Washington, DC - DC using stun grenades, pushing protesters to 16th : https://twitter.com/KateCantrell/status/1299916077409996800?s=20
Day 94 - 20:54 PDT - Washington, DC - more teargas
Day 94 - 21:00 PDT - Washington, DC - pepperballs and teargas
Day 94 - 21:05 PDT - Washington, DC - cop line pushing, teargas and arrests
Day 94 - N/A - Washington, DC - water bottle thrown at police : https://twitter.com/RichieMcGinniss/status/1299919544291659782?s=20
Day 94 - 21:05 PDT - Washington, DC - Snack Van attacked by MPD. Pull driver out of van. - https://twitter.com/KunkleFredrick/status/1299923008669310978?s=20 - https://twitter.com/KittyLists/status/1299924498368458752?s=20 - https://twitter.com/pghphotos/status/1299928769696854016
Day 94 - 21:09 PDT - Washington, DC - MPD cop riot line marching down street to push protestors out.
Day 94 - 21:22 PDT - Portland, OR - Joey Gibson's hat got got. - https://twitter.com/ToolFree2point0/status/1299929224317472768
Day 94 - 21:23 PDT - Portland, OR - riot cops move in, arrests made
Day 94 - N/A - https://twitter.com/hungrybowtie/status/1299917708520169472?s=20
Day 94 - 21:40 PDT - Portland, OR - cop clears protesters from the gas station Joey is hiding in
Day 94 - 21:43 PDT - Oakland, CA - gas and flashbangs
Day 94 - 21:44 PDT - Oakland, CA - cops are following the march, taking shields
^https://twitter.com/EastBayMajority/status/1299929421495713792?s=20
Day 94 - 21:46 PDT - Oakland, CA - "violent acts like [...] the use of shields will not be tolerated." unlawful assembly declared
^https://twitter.com/oaklandpoliceca/status/1299932791254130688?s=20
Day 94 - 21:47 PDT - Oakland, CA - 3 arrests
^https://twitter.com/ToolFree2point0/status/1299932316907851778?s=20
Day 94 - 21:53 PDT - Washington DC - arrests made, people "lightly" injured 
^https://twitter.com/ChuckModi1/status/1299932775408074754?s=20
Day 94 - 22:05 PDT - Oakland, CA - the oakland march has been pushed into a park and is staying there for now, watched by cops, chanting "please (?) go home"
Day 94 - 22:16 PDT - Oakland, CA - people are dispersing
Day 94 - 22:28 PDT - Sacramento, CA - arrests made. cops are standing around a car with a detained person kneeling next to it, hands ziptied, car is searched. 3 arrests in total reported on black zebra and VNN
Day 94 - 22:19 PDT - Sacramento, CA - Some protesters are tagging buildings "ACAB dummy": https://twitter.com/KittyLists/status/1299939695615303680?s=20
Day 94 - 23:01 PDT - Sacramento, CA - 1 arrest made for directing a laser in an officer’s eyes. 1 suspect was arrested for resisting officers.  The suspects were in possession of 1 bottle of urine, gas masks and a smoke bomb.
^https://twitter.com/SacPolice/status/1299950639099736065?s=20
Day 94 - 22:39 PDT - Portland, OR - cop line shoving back two meters for no discernible reason
Day 94 - 22:44 PDT - Washington DC - flashbangs/triple chasers, rubber bullets
Day 94 - 22:57 PDT - Portland, OR - several hundred antira assembled infront of the JC
Day 94 - 23:01 PDT - Washington, DC - flash bang, mace, beanbag rounds, rubber bullets. https://twitter.com/pghphotos/status/1299949665585164290?s=20 + https://twitter.com/ChuckModi1/status/1299951209785196545?s=20 + press bleeding https://twitter.com/ChuckModi1/status/1299951313107726338?s=20
Day 94 - 23:11 PDT - Washington, DC - 2nd riot cop line closing in
Day 94 - 23:14 PDT - Washington, DC - most of the crowd moved on
Day 94 - 23:22 PDT - Washington, DC - line of bike cops closing the third side of the croassroad with maybe 80 protesters left
Day 94 - 23:23 PDT - Washington, DC - cops are clearing the crossroad, pepperspray out, no kettle
Day 94 - 23:43 PDT - Washington, DC - DC police push again (this may have been a pervious push) https://twitter.com/ChuckModi1/status/1299966217546067968?s=20 (text only) https://twitter.com/pghphotos/status/1299961846947090433 + https://twitter.com/pghphotos/status/1299961329017643015
Day 94 - 23:50 PDT - Washington, DC - loud bang off camera
Day 94 - N/A - Green Bay, WI - shit went down in Green Bay WI https://twitter.com/LizJone26271417/status/1301367426651545600?s=19
Day 95 - 00:00 PDT - Portland, OR - Someone in Civilian cloths about to exit the JC then sees streamer @AnitaNoelleGreen . possible plant https://clips.twitch.tv/ToughVastWalrusMcaT
Day 95 - 00:04 PDT - Portland, OR - second former plant spotted by @AnitaNoelleGreen  and crew https://clips.twitch.tv/BumblingAlluringThymePRChase
Day 94 - N/A - Portland, OR - the DEFUND lettering was damaged by bootlickers https://twitter.com/MissScarletTana/status/1299969596707893250?s=20
Day 95 - 00:13 PDT - Washington, DC - DC police march away https://twitter.com/ChuckModi1/status/1299969438406578177 
^“You can take off that uniform, that badge. But I can not take off the skin that I’m in. And if I had to choose, I’d come back as a Black woman all over again” 
^https://twitter.com/ChuckModi1/status/1299972772979003392?s=20
Day 95 - 00:15 PDT - Portland, OR - girl and others sings in the park https://twitter.com/BaghdadBrian/status/1299974491624206338?s=20
^https://twitter.com/BaghdadBrian/status/1299979760806764547?s=20
Day 95 - 00:43 PDT - Washington, DC - A small group has continued marching in DC with some escort cars from the MPD? (one has whistle that sounds like a alarm) https://twitter.com/ltrain87x/status/1299979402823032832?s=20
Day 95 - 01:01 PDT - Washington, DC - Small group march is now near Whitehouse where they disperse
Day 95 - 08:59 PDT - Charleston, SC - BLM trombone player arrested
Day 95 - 09:09 PDT - Charleston, SC - both sides leave in charleston
Day 95 - 10:00 PDT - San Francisco, CA - Pro-Trump groups have formed together for a "Walk Away" rally that plans to cross the Golden Gate Bridge: https://twitter.com/sandraschulze/status/1300131316524969984?s=20
Day 95 - 11:00 PDT - Pro-Trump supporters are gathered on the bridge, taking pictures and mainly standing around: https://twitter.com/916Mimi916/status/1300137108586160133?s=20
Day 95 - 11:40 PDT - They are continuing across the bridge with police protection: https://twitter.com/lilitaliangrr/status/1300141555152351232?s=20
Day 95 - 12:00 PDT - A handful of counter protesters are heckling the crowd, as the police move in to protect pro-Trump side. They shout "back the blue"in response. 
Day 95 - 12:15 PDT - Police have 2 men on the ground under arrest reason unknown; a third person is taken into custody soon after.
Day 95 - 11:30 PDT - Manchester, NY -  Break the Cycle/ Gays Against Guns protesters are gathered at Union Square: https://twitter.com/datainput/status/1300165784141008900?s=20
Day 95 - N/A - Los Angeles, CA -  Pro-Trump "Drive-By Rally" on Ventura Blvd: https://twitter.com/josie_huang/status/1300147597529628672?s=20
Day 95 - 14:00 PDT - Aurora, CO - Hundreds gather at MLK Jr. Library before march to Denver City Park: https://twitter.com/Joshuajered/status/1300186977770250240?s=20
Day 95 - 14:30 PDT - Los Angeles, CA - Police presence as the Tr-mp caravan proceeds down Ventura Blvd: https://twitter.com/benFranklin2018/status/1300183916259704832?s=20
^Protesters and Tr-mp Supporters argue in Studio City: https://twitter.com/anoncatanoncat/status/1300184016088436741?s=20
Day 95 - 18:26 PDT - Providence, RI - one person arrested, not clear if they're part of the BLM group
^https://twitter.com/madeleine_list/status/1300244653191704576
Day 95 - 19:28 PDT - Providence, RI - BLM leaves the public safety complex, marches back to the public highschool
^https://twitter.com/BrittanyTVNews/status/1300259200153645056
Day 95 - 19:56 PDT - Los Angeles, CA - protesters marching to Fairfax district:  https://twitter.com/BarnBurnerBaby/status/1300266137314353152?s=09
Day 95 - 20:14 - Washington, DC - MPD heli overhead https://twitter.com/rawsmedia/status/1300270806241599488
Day 95 - 20:37 - Washington, DC - A great reminder to spend your money with black owned businesses, amidst a beautiful speech to the group taking a break from marching.
Day 95 - 21:07 PDT - Washington, DC - teargas at BLM plaza, press is ordered to go into the cloud.
^https://twitter.com/FordFischer/status/1300316648864395266
^https://twitter.com/aletweetsnews/status/1300286542100000768
^https://twitter.com/FordFischer/status/1300316125440376832
Day 95 - 21:12 PDT - Washington, DC - bike cops charging, multiple arrests
^https://twitter.com/KittyLists/status/1300286221600526336
Day 95 - 21:14 PDT - Washington, DC - bean bags or pepperballs
Day 95 - 21:15 PDT - Washington, DC -ImHiram pepper sprayed straight onto the camera
Day 95 - 21:15 PDT - Washington, DC - riotline pushing, clearing the intersection
Day 95 - 21:19 PDT - Washington, DC - the remaining BLM group starts moving again, MPD is blocking all ways back to the WH
Day 95 - 21:27 PDT - Portland, OR - march towards Kelly building starts
^https://twitter.com/Human42LM/status/1300289592583626752
^https://twitter.com/faizsays/status/1300290509647175687
Day 95 - 22:30 PDT - Portland, OR- Residents come out of their house to scream at police to get off their property: https://twitter.com/catalinagaitan_/status/1300300726460059649?s=09
Day 95 - 22:26 PDT - Portland, OR - cops are towing cars, reportedly slashing tires (charge of disorderly conduct - Halospace) one block from the protest (reportedly support cars) https://twitter.com/PDocumentarians/status/1300304422547849216
Day 95 - 22:40 PDT - Portland, OR - unlawful assembl out of nowhere due to "illegal activity such as blocking the street and throwing objects"
Day 95 - 22:48 PDT - Portland, OR - cops are rushing in, multiple arrests
^https://twitter.com/ByMikeBaker/status/1300310068517167104
^https://twitter.com/GriffinMalone6/status/1300312690674397184
^https://twitter.com/_WhatRiot/status/1300320019948085248
Day 95 - 22:50 PDT - Portland, OR - "if you're not press, you will be arrested" - cop on dakisback, more arrests 
^https://twitter.com/GriffinMalone6/status/1300313567959285760
Day 95 - 22:52 PDT - Portland, OR - more arrests for being on the street (?) https://twitter.com/ByMikeBaker/status/1300311267970707461
^https://twitter.com/PDocumentarians/status/1300315222507319296
^https://twitter.com/GriffinMalone6/status/1300315878014160896
Day 95 - 22:55 PDT - Portland, OR - cops are pushing back, removing press from the scene
Day 95 - 22:55 PDT - Portland, OR - "mason" (press member?) arrested
^https://clips.twitch.tv/ZealousJollyCourgetteTBTacoLeft
^https://clips.twitch.tv/EagerDignifiedLEDTebowing
Day 95 - 22:58 PDT - Portland, OR - pepperballs as a goodbye
Day 95 - 23:47 PDT - Portland, OR - LRAD tells the remaining protesters to leave. they don't.
Day 95 - 23:53 PDT - Portland, OR - cops rush, multiple arrests
Day 95 - 23:55 PDT - Portland, OR - "if you're press: be quiet, quit protesting" - PPD
Day 96 - 00:30 PDT - Portland, OR - ppD tells protesters to turn the music off. they comply and most go home.
Day 96 - 19:00 PDT - South Los Angeles, CA - At least 15 deputies and 3 LASD SUVs are on site of an investigation where an"officer-involved" shooting occurred earlier this afternoon. A small group of community members have gathered. This is not a directly related event to the protests and further information will only serve as speculation. :stop_button:
Day 96 - 20:00 PDT - South Los Angeles, CA - Crowd continues to gather at the scene of 109th and Budlong. Sherriff deputies stand in line: https://twitter.com/PplsCityCouncil/status/1300630439044898816?s=20
Day 96 - 20:28 PDT - Iowa City, IA - Protesters stand in line with state patrol. https://twitter.com/ZacharyOS/status/1300636575311826945?s=20
Day 96 - 21:11 PDT - Los Angeles, CA - LASD and protestors still on site. LASD has impact munitions. LASD currently remaining calm and deciding not to riot. - https://twitter.com/SamBraslow/status/1300647386490920960?s=20
Day 96 - 22:00 PDT - Portland, OR - Protests leave the park and begin march. - https://twitter.com/45thabsurdist/status/1300662013291450370?s=20
Day 96 - 22:08 PDT - Portland, OR - Fireworks for Ted's birthday. - https://twitter.com/45thabsurdist/status/1300662854316511232?s=20
Day 96 - 22:19 PDT - Portland, OR - Trashcan on fire on street in front of Ted Wheeler's condo. - https://twitter.com/PDocumentarians/status/1300667233962586112?s=20
Day 96 - 22:20 PDT - Los Angeles, CA - BLMLA cofounder Malina Abdullah gives speech at spot where Dijon Kizzie was shot and killed by LASD - https://twitter.com/SamBraslow/status/1300667306608001024?s=20
Day 96 - 22:30 PDT - Portland, OR - Protestors do the Macarena in front of Ted's place. - https://twitter.com/45thabsurdist/status/1300667008497795073
Day 96 - 22:48 PDT - Los Angeles, CA - Chopper circling around the neighborhood where the protestors are.
Day 96 - 22:51 PDT - Portland, OR - Protestors have now set a picnic table on fire in front of Ted Wheeler's apartment.
Day 96 - 23:09 PDT - Portland, OR -PPB declare unlawful assembly: https://twitter.com/catalinagaitan_/status/1300677168255528961?s=20
Day 96 - 23:10 PDT - Portland, OR - PPB rushing and knocking people down. (seen a kick to the head by PPB)
Day 96 - 23:11 PDT - Portland, OR - PPB makes arrests.
Day 96 - 23:13 PDT - Portland, OR - PPB declares a riot. - https://discordapp.com/channels/200797771664457728/716861394703745036/750237704226078720
Day 96 - 23:14 PDT - Portland, OR - PPB  deploys tear gas immediately after declaring a riot.
Day 96 - 23:23 PDT - Portland, OR - PPB bull rush and make arrests. - https://twitter.com/MrOlmos/status/1300682200082345985?s=20
Day 96 - 23:35 PDT - Portland, OR - Arex arrested by PPB. - https://clips.twitch.tv/AttractiveDaintyPandaCoolStoryBro
Day 96 - 23:40 PDT - Portland, OR - Arrest - https://twitter.com/Johnnthelefty/status/1300684525727395845?s=19
Day 96 - 23:46 PDT - Los Angeles, CA - Protestors are now gathering at the LASD South LA Station.
Day 97 - 00:18 PDT - Los Angeles, CA - LASD declare unlawful assembly at LASD South LA Station.
Day 97 - 00:22 PDT - Los Angeles, CA - Warning (threat) of chemical agents to be deployed.
Day 97 - 00:54 PDT - Los Angeles CA - Protesters are shining their lights back to the deputies:  https://twitter.com/stillgray/status/1300703427857584129?s=20
Day 97 - 01:35 PDT - Los Angeles, CA - one minute to get off the property, protesters move to sidewalk
Day 97 - 01:42 PDT - Los Angeles, CA - multiple LASD chase after and tackle protester walking to car, mace may have been used. Crowd largely dispended though helicopter still hovering low overhead
Day 97 - N/A - Twitter and Reddit got Teds Wheelers sorry ass to call out the officer seen punching a protester https://m.facebook.com/PDXMayorTedWheeler/posts/10158588677668620
Day 97 - 12:31 PDT - Seattle, WA - Cal Anderson sweep: pushing, punches and 2 arrests for being in the park
Day 97 - 12:34 PDT - Seattle, WA - mace used by SPD
Day 97 - 12:37 PDT - Seattle, WA - one arrestee carried away while the houseless people's belongings are trashed by SPD https://twitter.com/CloverComrade/status/1300880354920730624
Day 97 - 13:29 PDT - Seattle, WA - arrest, person was walking on the sidewalk half a block away
DAY 97 - 14:00 PDT - Kenosha, WI - Mace and 2 arrests
Day 97 - N/A - President Trump visited Kenosha despite being asked to stay away. https://thehill.com/homenews/administration/514677-trump-sidesteps-blake-shooting-to-extol-law-enforcement-in-kenosha
Day 97 - 1830 PDT - Los Angeles, CA - Protesters have gathered at South Los Angeles Sheriff''s Station in response to the recent shooting of Dijon Kizzee, a 29-year-old Black man, who was shot and killed yesterday: https://twitter.com/blue_criminalv/status/1300973503504506886?s=20
Day 97 - 1850 PDT - Los Angeles, CA - Protesters are marching together toward the station: https://twitter.com/LATvives/status/1300974277429047296?s=20
Day 97 - 1915 PDT - Los Angeles, CA - Protesters stand outside LASD station while other prepare to leave: https://twitter.com/commieAK47/status/1300980952458354690?s=20
Day 97 - 1930 PDT - Majority of protesters have left Last station.
Day 98 - 11:31 PDT - Wilmington, NC - 3 Protesters arrested, 2 for impeding traffic/ protesting in the street, 1 for obstructing an arrest
Day 98 - N/A - Rochester, NY - RPD is forced to release footage of a incident that happened months ago involving Daniel Prude, several people get arrested at mayors press conference
Day 98 - 11:52 PDT - Rochester NY - Pepper balls shot (not the first burst tho) and targeted arrest.  https://twitter.com/WillCleveland13/status/1301231480975302656?s=20
Day 98 - 13:48 PDT - Rochester, NY - cops adavance, pepperballs used, then retreat
^https://twitter.com/News_8/status/1301263613324296194?s=20
Day 98 - 13:53 PDT - Rochester, NY - cops advance again, 3rd use of pepperballs of the day
Day 98 - 14:09 PDT - Rochester, NY - another round of pepperballs
Day 98 - 14:55 PDT - Rochester, NY - BLM leaves the PSB for a march, followed by cops
Day 98 - 15:40 PDT - Rochester, NY - Man spots Rochester PD getting LRAD prepared near protests: 
^https://twitter.com/johnny_guitar_/status/1301288742007779331?s=19
^cop line established infront of 7th pd, Washington DC https://twitter.com/TheArtist_MBS/status/1301327206350815235
Day 98 - 18:26 PDT - Kenosha, WI - snack van guy pulled over for broken tail light and side mirror and then searched with K9 unit and van impounded due to no insurance
Day 98 - 19:03 PDT - Washington, DC - protestors run out FOX News the minute they arrive https://twitter.com/KateCantrell/status/1301355772127870976?s=20
Day 98 - 20:27 PDT - Washington, DC - protester on megaphone "none of ya'll...are blue": https://twitter.com/KatJohnsonDC/status/1301361032951214081?s=20
Day 98 - 20:45 PDT - Washington, DC - tensions continue to rise: https://twitter.com/SVNewsAlerts/status/1301365572416962565?s=20
Day 98 - 23:45 PDT - Portland, OR - Protesters have gathered at the North Precinct. https://twitter.com/hungrybowtie/status/1301410012271525888?s=20
Day 98 - 00:01 PDT - Portland, OR - Police threaten arrest, use of force without any provocation: https://twitter.com/shane_burley1/status/1301415457077903366?s=20
Day 98 - 00:38 PDT - Portland, OR - Protesters move toward police cars: https://twitter.com/hungrybowtie/status/1301425742052425729?s=20
^cops are clearing out the street, arrests made https://clips.twitch.tv/OriginalFantasticKaleRitzMitz
^https://clips.twitch.tv/ObeseSucculentCarrotCopyThis
Day 99 - 16:37 PDT - Rochester, NY - Rochester Mayor Lovely Warren shows up to Vigil for Daniel Prude then leaves protest after being called out on why the video was hidden for months. https://twitter.com/nataliarodmed/status/1301665608459747332?s=20
Day 99 - 16:37 PDT - New York City, NY - NSFW car "drives" thru crowdhttps://twitter.com/JoshuaPotash/status/1301675520128700416?s=20 + https://twitter.com/GwynneFitz/status/1301674428074524673?s=20 + https://twitter.com/datainput/status/1301675670846795779?s=20
^https://twitter.com/protest_nyc/status/1301698567522988033?s=20
Day 99 - 19:18 PDT - Rochester, NY - pepperballs and rubber bullets in rochester
^https://twitter.com/mcfw/status/1301707410818686976
^https://twitter.com/ccjgarzone/status/1301706240880529408
^pepper spray and pepper balls fired in rochester
Day 99 - 19:22 PDT - Rochester, NY - new round of mace and pepperballs/rubberbullets, press hit
^https://twitter.com/GeofferyRogers/status/1301709140499279874
^https://twitter.com/mcfw/status/1301709003236483072
^https://twitter.com/zdroberts/status/1301724257349767169
Day 99 - 19:28 PDT - Rochester, NY - new massive round of pepperballs/rubber bullets
Day 99 - 19:40 PDT - Rochester, NY - rpd gets reinforcements in grey uniforms
Day 99 - 19:50 PDT - Rochester, NY - again massive deployment of less lethal ammunition, shooting at people 30 meters from the fence or running away
^https://twitter.com/greg_doucette/status/1301729199703707649
Day 99 - 19:59 PDT - Rochester, NY - cops again forcing a temporary retreat by less lethal ammunition
^https://twitter.com/adriawalkr/status/1301716594335375360
Day 99 - 20:07 PDT - Rochester, NY - a smaller wave of shooting for a change, forcing a retreat but not shooting at the people running away
Day 99 - 10:11 PDT - Rochester, NY -it's tuning into more of a constant drizzle of pepperballs and rubber bullets now
^man approaching police in rochester
Day 99 - 20:22 PDT - Rochester, NY - the fence is down
Day 99 - 20:27 PDT - Rochester, NY - cops forcing another retreat by massive use of less lethals
^https://twitter.com/zdroberts/status/1301724257349767169
Day 99 - 20:30 PDT - Rochester, NY - fence has now been replaced by cops with batons and helmets https://twitter.com/adriawalkr/status/1301726010916904960
Day 99 - 20:51 PDT - Rochester, NY - mace used https://twitter.com/adriawalkr/status/1301729807454146564
Day 99 - 20:54 PDT - Rochester, NY - cops are advancing further
^https://twitter.com/adriawalkr/status/1301731021365403648
Day 99 - 20:58 PDT - Rochester, NY - newly established cop line keeps people under the bridge or on the parking lot, no one right infront of PBS anymore.
^https://twitter.com/adriawalkr/status/1301733916425019392
^forming wall: https://twitter.com/adriawalkr/status/1301736303827005441?s=20
Day 99 - 21:21 PDT - Portland, OR - portland starting to march
Day 99 - N/A - RPD trying to start clearing the parking lot by constant low intensity shooting of less lethals, arrest made on the street betwen PD and parking https://twitter.com/anoncatanoncat/status/1301740791761526786
^https://twitter.com/adriawalkr/status/1301739620284149760
Day 99 - 21:37 PDT - Rochester, NY - RPD line advancing under bridge, arrest(s) made
^https://twitter.com/adriawalkr/status/1301741654169145345
Day 99 - 21:40 PDT - Rochester, NY - cop line now established at the other side of the bridge
^https://twitter.com/zdroberts/status/1301743889133559808
Day 99 - 21:40 PDT - Portland, OR - PDX march arrived at MCSO https://twitter.com/pdxpigwatch/status/1301757675953295360
^https://twitter.com/Johnnthelefty/status/1301762052285804544
Day 99 - 21:42 PDT - Rochester, NY - rochester cops advance another 10 meters shooting and using mace, protesters are rebuilding their line with a bit of a distance this time
^https://twitter.com/adriawalkr/status/1301742791278682114
^https://twitter.com/adriawalkr/status/1301743037597523969
Day 99 - 21:47 PDT - Rochester, NY - RPD shooting the protesters and advancing (barely anyone has shields or PPE), also using mace
^https://twitter.com/adriawalkr/status/1301745378153435136
Day 99 - 21:58 PDT - Rochester, NY - cops shortly stop their advance after 11 minutes of constant shooting and macing for a wave of high intensity shooting, more arrests with unknown charge. protesters are now ca 20 meters away and retreating
^https://twitter.com/adriawalkr/status/1301749268701642753
Day 99 - 22:01 PDT - Rochester, NY - cops stop at S Plymouth Ave x S Fitzburgh Street, protesters start a short march, then stop for a tactical meeting, presumably https://twitter.com/LizJone26271417/status/1301750105326854145
Day 99 - 23:58 PDT - Portland, OR - Officers rush out from MCSO into the street.  Arrest made.  Immediately retreat back to the building.
^https://twitter.com/MrOlmos/status/1301777415593549824
Day 100 - 00:15 PDT - Portland, OR - PPB turn off their lights.
Day 100 - 00:19 PDT - Portland, OR - Car drives through protestors at speed (no one hit) https://twitter.com/MrOlmos/status/1301782293476864001 https://twitter.com/PDocumentarians/status/1301783356934221824
Day 100 - 00:22 PDT - Portland, OR - PPB LRAD announces road is open for traffic and they are trying to stop the car that drove through. - https://twitter.com/MrOlmos/status/1301783073567027201
Day 100 - 00:52 PDT - Portland, OR - PPB come out and march down the street ignoring protestors.  No warnings given.  Surround an empty car.  Person moves it.  Seems they're only targeting vehicles on the road at this moment.  Returns to building after asking for 2 cars to be moved.
Day 100 - 01:13 PDT - Portland, OR - PPB roll out in small caravan and get out and start talking to people stopped in their cars. Potentially targeting medics. At least one arrest made. - https://twitter.com/PDocumentarians/status/1301798877842956288
Day 100 - 01:35 PDT - Portland, OR - PPB and protestors talk to each other and joke. Including 44.
Day 100 - 01:49 PDT - Portland, OR - PPB has cars towed out of the street. Media still chatting it up with 44. - https://twitter.com/AssfaultPirates/status/1301805450292162561
Day 100 - 01:55 PDT - Portland, OR - PPB leave the traffic stop. What little remains of press and protestors meander back to the MCSO building.
Day 100 - 10:28 PDT - Seattle, WA - [OFFSTREAM] Protestors shutdown southbound I5. - https://twitter.com/gramsofgnats/status/1301935234099814400?s=20
Day 100 - 10:35 PDT - Seattle, WA - [OFFSTREAM] Protestors let vehicle through blockade of a person who needed to get to a radiation appointment. - https://twitter.com/gramsofgnats/status/1301936772054618112
^Seattle: State patrol violently grab individuals out of their cars ^https://twitter.com/gramsofgnats/status/1301943130904649729?s=19
^https://twitter.com/CalebJHull/status/1301991931686334466?s=19
Day 100 - 17:50 PDT - Rochester, NY - hundreds are gathered at MLK Park. Speakers heard in background. https://twitter.com/DanSchrack/status/1302043821577043968?s=19
Day 100 - 18:21 PDT - Rochester, NY - jttv1005 holds up woke sticker
Day 100 - 18:40 PDT - Rochester, NY - March continues, crowds estimates now in the thousands (at least 5000): https://twitter.com/U_News_/status/1302067344571854848?s=19
^https://twitter.com/AFriendlyDad/status/1302066938261110784?s=19
Day 100 - 18:42 PDT - Rochester, NY - Large numbers of protesters march and small group begins to physically interact with diners in outdoor eating areas:
^https://twitter.com/ScooterCasterNY/status/1302060108898357257?s=19
Day 100 - 19:20 PDT - Rochester, NY - Singing while marching: https://twitter.com/GinoFanelli/status/1302069541233733632?s=19
^Rochester: shields to the front with PSB in sight, cops have blocked the street
^BLM approaches cop line, stops at fence
^RPD: unlawful assembly declared, "you are ordered to disperse", pepperballs
^https://twitter.com/Win4CBS/status/1302079780616105984
^https://twitter.com/ScooterCasterNY/status/1302077254772699136?s=19
^teargas?, pepperballs + mace. crowd retreating
^more pepperballs + mace
^cops advancing a bit, pepperballs + mace
^new round of pepperballs, bottles going back
Day 100 - 19:59 PDT - cops further advanicing
^new cop line established one block back
^tries to establish an umbrella wall opposite the cop line, cops advance under pepperball fire, protesters retreat
^standoff with ~20 meters distance, another large group never went towards PSB and is still marching
^PRB shooting a wave of less lethal rounds
^pepperball/ rubber bullet shots from roof/parking garage (?)
^RPD advance a bit, seemingly trying to scare the protesters away, but the shield + umbrella wall stands. pepperballs on and above head height https://twitter.com/HyeinK1m/status/1302089349467697152
^https://twitter.com/selfdeclaredref/status/1302088349067378689
Day 100 - 20:43 - Rochester, NY - bus station on fire https://twitter.com/DanSchrack/status/1302094136837799937
^next advance, pepperballs, shieldwall retreats (arrests?)
^riot cop line blocking the street in louisville
^new standoff in rochester
^barricades in rochester and police line advances
^cops attack the vanguard of maybe 30 people, lots of mace
^https://twitter.com/selfdeclaredref/status/1302093802040111106
^cops charge https://twitter.com/selfdeclaredref/status/1302095454965051393
^fireworks shot at cops while they are smashing drums
^teargas out
^standoff at a crossroad with cars still driving through
^cops tackling people standing by themselves in a side road, 2 (?) arrests
^cops charge, teargas used, people dispersed but still present all around downtown https://twitter.com/cheeksv/status/1302098876837629952
^people are regrouping at the original starting location
^(cops show up while people sit around eating pizza ,order to disperse)
^Rochester - Fireworks tossed at cops
^cops moving in, most people are leaving https://twitter.com/GeofferyRogers/status/1302105132163903488
Day 100 - 21:43 PDT - Rochester, NY - Security escorting local MSM around the protests. Telling streamers/independent media they aren't allowed to be out and record.
Day 100 - 21:45 PDT - Portland, OR - Protestors start their march to the PPA building. - https://twitter.com/BGOnTheScene/status/1302106402081579008 - https://twitter.com/MacSmiff/status/1302108563171491843 - https://twitter.com/BGOnTheScene/status/1302108079232659457
Day 100 - 21:57 PDT - Portland, OR - Protestors arrive at PPA building. PPB and OSP already at PPA building waiting for protestors. DJ LRAD announcing that road is open to traffic and to stay off private property or be subject to cop riots. - https://twitter.com/BGOnTheScene/status/1302109595918163970
Day 100 - 22:00 PDT - Portland, OR - LRAD announces again to stay off roadway and off property, including press and legal observers. Also instructing to move vehicles off the street or be impounded/citation. - https://twitter.com/garedicus/status/1302109688524345344
Day 100 - 22:05 PDT - Portland, OR - Third DJ LRAD announcement to stay off roadway and private property.
Day 100 - 22:07 PDT - Portland, OR - Car drives through protestors. No injuries. PPB reiterates warning stating that some motorists may not stop. - https://twitter.com/garedicus/status/1302111043397664768 - https://twitter.com/MacSmiff/status/1302116536274935808
Day 100 - 22:10 PDT - Portland, OR - PPB fourth warning about being on roadway.
Day 100 - 22:15 PDT - Portland, OR - PPB fifth warning.
Day 100 - 22:20 PDT - Portland, OR - PPB sixth warning.
Day 100 - 22:30 PDT - Portland, OR - Trumpet man and his friend playing and dropping bars.
Day 100 - 22:35 PDT - Portland, OR - Protestors speaking to the crowd. DJ LRAD interrupts for a moment with another warning. Protestors continue speaking to crowd.
Day 100 - 23:06 PDT - Portland, OR - Police light mage attempts to deploy photon violence. It is deflected by protestor reflectors.
Day 100 - 23:13 PDT - Portland, OR - PPB give another warning to leave the streets.
Day 100 - 23:28 PDT - Portland, OR - PPB give another warning.
Day 100 - 23:33 PDT - Portland, OR - More flash light battles instigated by the PPB.
Day 100 - 23:35 PDT - Portland, OR - The flashlight battle continues to escalate. Multiple flashlights are deployed on both sides.
Day 100 - 23:39 PDT - Portland, OR - PPB gives another warning.
Day 100 - 23:43 PDT - Portland, OR - PPB has declared an Unlawful Assembly.
Day 100 - 23:45 PDT - Portland, OR - PPB rush out to protestors. Make several arrests. Firing pepper balls/smoke/gas. - https://twitter.com/defendpdx/status/1302136594791497729 - https://twitter.com/45thabsurdist/status/1302137193385701376 - https://twitter.com/Cascadianphotog/status/1302137927070150658
Day 100 - 23:45 PDT - Portland, OR - PPB/OSP arrests. (cont)
Day 100 - 23:53 PDT - Portland, OR - After targeted arrests, PPB/OSP fall back to PPA. Protestors are still in the area.
Day 100 - 23:59 PDT - Portland, OR - Ambulance arrives at the PPA. Protestor being treated. - https://twitter.com/Cascadianphotog/status/1302144817082712065
Day 101 - 00:02 PDT - Portland, OR - PPB rush protestors at gas station and perform violent arrest. - https://twitter.com/GriffinMalone6/status/1302140600595087362 - https://twitter.com/MrOlmos/status/1302142304623321088 - https://twitter.com/MrOlmos/status/1302144388718501888
Day 101 - 00:04 PDT - Portland, OR - PPB pushing protestors down the street and keep making arrests.
Day 101 - 00:06 PDT - Portland, OR - PPB begin to disengage and pull back. Throw flash bangs and tear gas into the press. Firing pepper balls into the protestors. - https://twitter.com/Cascadianphotog/status/1302142786494316545
Day 101 - 00:10 PDT - Portland, OR - PPB fire rubber bullets to dissuade protestors from entering the street. - https://twitter.com/666hotdogs666/status/1302142654386499585 - https://twitter.com/666hotdogs666/status/1302138718124412928
Day 101 - 00:13 PDT - Portland, OR - PPB/OSP have fallen back to the PPA building again. Protestors are still around, but on the sidewalks.
Day 101 - 00:15 PDT - Portland, OR - PPB rush out to arrest a protestor in the street.
Day 101 - 00:17 PDT - Portland, OR - Guy on bike person comes up and is threatening protestors with a hammer. PPB help him back on his bike and he rides away.
Day 101 - 00:17 PDT - Portland, OR - PPB claim protestors are throwing projectiles and hitting police. Continue to advise of Unlawful Assembly.
Day 101 - 00:23 PDT - Portland, OR - Guy returns and walks back and forth on the street between PPB and Protestors. - https://twitter.com/666hotdogs666/status/1302145973674745857
Day 101 - 00:25 PDT - Portland, OR - PPB arrest bike guy. - https://twitter.com/666hotdogs666/status/1302146435366793216
Day 101 - 00:41 PDT - Portland, OR - PPB arrest medics/mutual aid parked at gas station.
Day 101 - 00:45 PDT - Portland, OR - Some PPB rush back towards the PPA. - https://twitter.com/R3volutionDaddy/status/1302153476416311296
Day 101 - 00:49 PDT - Portland, OR - PPB harass Anita Noelle Green and tell her to "act like an adult." - @AnitaNoelleGreen for later.
Day 101 - 00:55 PDT - Portland, OR - PPB LRAD states they are disengaging and start to retreat back to the PPA.
Day 101 - 00:58 PDT - Portland, OR - PPB deploy gas as they retreat.
Day 101 - 01:02 PDT - Portland, OR - PPB Rush down the street. Make a violent arrest. - https://twitter.com/Cascadianphotog/status/1302155847653642240
Day 101 - 09:29 PDT - Dallas, TX - altercations between BLM and chuds in sherman, punches, mace by chuds, BLM minister arrested
^https://clips.twitch.tv/NurturingBlushingHareTebowing
Day 101 - 20:18  PDT - Rochester, NY -Umbrella line stands strong.
Day 101 - 20:19  PDT - Rochester, NY - Again with the loud alarm via LRAD.
Day 101 - 20:22  PDT - Denver, CO - protesters in street
Day 101 - 20:22  PDT - Los Angeles, CA - protesters arrive: https://twitter.com/bfeinzimer/status/1302446996641312768)
Day 101 - 20:22  PDT - Washington, DC - marching: https://twitter.com/rawsmedia/status/1302446845747224577)
Day 101 - 20:24  PDT - Rochester, NY - Lots of yelling. ++LRAD.
Day 101 - 20:24 PDT - Louisville, KY -- march
Day 101 - 20:33 PDT - Rochester, NY- MVI  Driver seems to have run through protesters 
Day 101 - 20:31 PDT - Rochester, NY- .press hide in bus stop
Day 101 - 20:33 PDT - Rochester, NY - .more smoke/gas observed:: The air is thick with smoke. Officers demanding those inside the barrier (which has stretched farther down West Main St) to leave immediately. Also stating and vehicles need to leave: https://twitter.com/WillCleveland13/status/1302449953759952896 
^'we get it mfs" "we aren't leaving!" 'put on your masks and FIGHT"
Day 101 - 20:35 PDT - N/A - Denver thread with multiple updates: https://twitter.com/KPouthere/status/1302489290467954688?s=20
Day 101 - 20:39 PDT - Los Angeles, CA - LASD fire gas, pepper balls, and  at protestors. No announcement for Unlawful Assembly or Riot. NLG, media and kids in the crowd. Response to someone touching the fence. - https://twitter.com/waterspider__/status/1302452882562662400 - https://twitter.com/waterspider__/status/1302453460374183937 - https://twitter.com/_preciouschild/status/1302485092623773696?s=21
Day 101 - 20:58 PDT - Rochester, NY - Firework deployed at police line
Day 101 - 21:02 PDT - Rochester, NY - Car
Day 101 - 21:04  PDT - Denver, CO  - Marching


Day 101 - 21:04  PDT - Rochester NY - Chanting; umbrellas still holding a line to police
Day 101 - 21:05 PDT - Rochester NY - Huge boom/LRAD/ someone injured, medics attending. https://twitter.com/CannonCaptures/status/1302484965930790912?s=20
Day 101 - 21:06PDT - https://twitter.com/KittyLists/status/1302481652652732416?s=20
^'hold the line!' 'don't stop now' 'we stronger than them'
Day 101 - 21:14 PDT - Rochester NY - Protesters trapped /boxed in by police: https://twitter.com/KD_Perkins/status/1302459535521648640
Day 101 - 21:16 PDT - Portland OR - Projectile is thrown into street and flames erupt. NSFL Protester is hit by flames and begins to panic. Runs toward crowd who assists in putting out flames.
^https://twitter.com/TaylerUSA/status/1302461688910770176?s=20
^https://twitter.com/SCCacti/status/1302460916013895680
Day 101 - 21:15 PDT - Los Angeles CA - [OFFSTREAM] LASD continue to fire on protestors that remain at the station. - https://twitter.com/waterspider__/status/1302460233290117122
Day 101 - 21:19 PDT - Portland OR - LRAD announcement.
Day 101 - 21:20 PDT - Los Angeles CA - Helicopter circling above protesters:
^https://twitter.com/waterspider__/status/1302461209044688896
Day 101 - Rochester NY: Thread with updates: https://twitter.com/gsilvarole/status/1302473207522512897?s=20
Day 101 - 21:22 PDT - Portland OR - PPB march in to begin pushing protestors out. Teargas and flash bangs out. Protestors throw fireworks in return. One canister lands under a car. - https://twitter.com/GriffinMalone6/status/1302464017114345472?s=20
Day 101 - 21:24 PDT - Portland OR - PPB declares riot. - https://twitter.com/1misanthrophile/status/1302462281188425728
Day 101 - 21:27 PDT - Portland OR - PPB retreat back to vans.
Day 101 - 21:32 PDT - Portland OR - Protestors build barrier and prepare to make a stand. - https://twitter.com/MrOlmos/status/1302465742395207680 - https://twitter.com/tehandrew_/status/1302474769506250752
Day 101 - 21:37 PDT - Portland OR - PPB begin to approach barrier and start to push protestors down the street. - https://twitter.com/MrOlmos/status/1302470146557054981
Day 101 - 21:37 PDT - Portland OR - PPB and protestors exchange tear gas and fireworks. - https://twitter.com/IwriteOK/status/1302468794384703488 - https://twitter.com/MrOlmos/status/1302466743554600961 - https://twitter.com/MrOlmos/status/1302470306783584258
Day 101 - 21:38 PDT - Portland OR - PPB make multiple arrests. - https://twitter.com/TheRealCoryElia/status/1302469285810327552 - https://twitter.com/IwriteOK/status/1302477625122668544 - https://twitter.com/JenDowlingKoin6/status/1302478576847998977
Day 101 - 21:43 PDT - Portland OR - PPB pause to regroup.
Day 101 - 21:46 PDT - Portland OR - PPB make an arrest.
Day 101 - 22:05 PDT - Portland OR - Portland Protestors are continuing the march to the East Precinct. - https://twitter.com/MrOlmos/status/1302472572311756802
Day 101 - 22:10 PDT - Portland OR - PPB Bullrush behind protestors. multiple violent arrests. - https://twitter.com/suzettesmith/status/1302476414667563008 - https://twitter.com/MrOlmos/status/1302475514456600579 - https://twitter.com/R3volutionDaddy/status/1302475834381410305
Day 101 - 22:10 PDT - Portland OR - PPB Punching detainee.
Day 101 - 22:10 PDT - Rochester NY - [OFFSTREAM] RPD arresting press walking back to their cars. Press released 1 hour later. - https://twitter.com/gsilvarole/status/1302473207522512897 - https://www.democratandchronicle.com/story/news/2020/09/05/daniel-prude-rochester-ny-black-lives-matter-protests-justice-police/5732337002/
Day 101 - 22:24 PDT - Rochester NY - U-Haul truck on fire. FD onsite to put it out. - https://twitter.com/barstow_scott/status/1302476967867027457 - https://twitter.com/barstow_scott/status/1302476110714884097
^25 firetrucks arrive and put out
Day 101 - 22:41 PDT - Portland OR - Protestors still marching. - https://twitter.com/MrOlmos/status/1302479807762976770 - https://twitter.com/PDocumentarians/status/1302487277994614789
Day 101 - 22:48 PDT - Portland OR - PPB LRAD gives warning to disperse. Still a riot.
Day 101 - 22:50 PDT - Portland OR - PPB riot line marching behind protestors.
Day 101 - 22:51 PDT - Portland OR - PPB rushes, make arrests. - https://twitter.com/IwriteOK/status/1302483315992133634 - https://twitter.com/suzettesmith/status/1302492184571125760
Day 101 - 22:53 PDT - Portland OR - PPB fire smoke into press. Keep trying to push them away and trying to prevent press from filming.
Day 101 - 22:58 PDT - Portland OR - Teargas out. Protestors returning the canisters. - https://twitter.com/IwriteOK/status/1302486366622801931
Day 101 - 23:03 PDT - Portland OR - PPB continue to push protestors into a residential neighborhood. making arrests along the way. - https://twitter.com/1misanthrophile/status/1302488587854688256 - https://twitter.com/BridgetChavezTV/status/1302488630489829376
Day 101 - 23:16 PDT - Portland OR - PPB begin pushing protestors down the street again. Fire pepper balls into the protestors.
Day 101 - 23:19 PDT - Portland OR - PPB drop smoke and start to retreat. Press continue to follow the PPB. Keep shining lights into cameras.
Day 101 - 23:28 PDT - Portland OR - PPB start rushing and arresting protestors. Still on the same street.
Day 101 - 23:38 PDT - Portland OR - PPB make arrests.
Day 101 - 23:57 PDT - Portland OR - OSP mount and disperse.
Day 102 - 00:05 PDT - Portland OR - PPB continue to hold a riot line next to the park. Protestors are marching.
Day 102 - 00:24 PDT - Portland OR - LRAD announcement advising of use of force and riot declaration.
Day 102 - 00:30 PDT - Portland OR - Protestors continue marching.
Day 102 - 00:36 PDT - Portland OR - Protestors march back to the PPB riot line.
Day 102 - 00:37 PDT - Portland OR - PPB starts to push protestors down the road again. Less lethals and fireworks are exchanged.
Day 102 - 00:42 PDT - Portland OR - PPB shoot smoke into press and under cars.
Day 102 - 00:43 PDT - Portland OR - PPB roll out.
Day 102 - 00:56 PDT - Portland OR - Protestors begin marching out of the park again.
Day 102 - 01:05 PDT - Portland OR - LRAD issues warnings to protestors hanging out around the park.
Day 102 - 01:07 PDT - Portland OR - PPB begins marching down street to push protestors off the street.
Day 102 - 01:10 PDT - Portland OR - PPB push people through the park to disperse.
Day 102 - 01:14 PDT - Portland OR - Explosions are heard on stream. Reports of pipe bombs thrown out by PBs. - https://twitter.com/RobHarden/status/1302519775294140417 - https://twitter.com/pdocumentarians/status/1302551037958434821?s=21
Day 102 - 01:15 PDT - Portland OR - PPB make several arrests. - https://twitter.com/garedicus/status/1302520370210238469
Day 102 - N/A - Rochester NY - Mayor Lovely Warren and Rochester Police Chief La'Ron Singletary hold a press conference https://13wham.com/news/local/mayor-warren-and-chief-singletary-respond-to-daniel-prude-protests skip to 20:00min on video
Day 102 - 16:40 PDT - Rochester NY- 'Elder Shield' has lined up in anticipation of protesters: https://twitter.com/CitizenMurphy/status/1302747918831681536?s=20
^https://twitter.com/JoshNavarroTV/status/1302756636784758785?s=20
^https://twitter.com/chrisdonato04/status/1302767558471413760?s=20
Day 102 - 16:44 PDT - Rochester NY - Protesters gather around memorial for Daniel Prude: https://twitter.com/AFriendlyDad/status/1302754905833107456?s=20
Day 102 - 16:46 PDT - Rochester NY - Protesters chanting: https://twitter.com/AFriendlyDad/status/1302757451054235648?s=20
^Rochester NY -[pic: https://twitter.com/CitizenMurphy/status/1302758268620754945?s=20]
Day 102 - 17:02 PDT - Rochester NY - More gather for Daniel Prude: https://twitter.com/msantiagophotos/status/1302758641813028864?s=20
Day 102 - 17:04 PDT - Rochester NY - A man kneels before a makeshift vigil for Daniel Prude at Jefferson Avenue and Dr. Samuel McCree Way.: https://twitter.com/david_andreatta/status/1302759226968887296?s=20
Day 102 - 17:20 PDT  - Rochester NY -Estimated 300-400 people have now gathered:  https://twitter.com/WXXINews/status/1302763789063000069?s=20
^video: https://twitter.com/adriawalkr/status/1302764270384549892?s=20
Day 102 - 17:23 PDT  - Rochester NY -Community members speak: https://twitter.com/GeofferyRogers/status/1302764167682760704?s=20
Day 102 - 17:28 PDT  - Rochester NY -Speaking continues, crowd engages with chanting: https://twitter.com/tr00p3rr/status/1302765621101449217?s=20
Day 102 - 17:29 PDT  - Rochester NY - PD states the crowd estimate is 1000+: https://twitter.com/RochesterNYPD/status/1302765886424711168?s=20
^https://twitter.com/david_andreatta/status/1302766312637321217?s=20
Day 102 - 17:35 PDT  - Rochester NY - 'Elders' are asked to move to the front of the line to act as the shield for protesters: https://twitter.com/LizJone26271417/status/1302767450769879041?s=20
Day 102 - 17:38 PDT  - Rochester NY - Protesters are preparing to march: https://twitter.com/AFriendlyDad/status/1302768209544638465?s=20
Day 102 - 17:39 PDT- Rochester NY- 'Elder Shield' chants "we are elders - we protect our youth!": https://twitter.com/msantiagophotos/status/1302768493222395904?s=20
Day 102 - 17:59 PDT- Rochester NY- March begins: https://twitter.com/edjsandoval/status/1302773384665800709?s=20
Day 102 - 18:15 PDT- Rochester NY- Marching continues:
^https://twitter.com/tr00p3rr/status/1302777339982614529?s=20
^https://twitter.com/iammix24/status/1302778073348288512?s=20
Day 102 - 18:15 PDT- MN
Day 102 - 18:17 PDT: Dallas TX - Protesters gather: https://twitter.com/colpeoplespress/status/1302777788269690880?s=20
Day 102 - 18:21 PDT- Rochester NY- 
^https://twitter.com/tr00p3rr/status/1302779192531132418?s=20
Day 102 - 18:25 PDT- Rochester NY- 
^https://twitter.com/MaranieRae/status/1302779451697180673?s=20
^"White Grandma with BLM Flag": https://twitter.com/iammix24/status/1302780054204809217?s=20
^.(potential issue with a white car)
Day 102 - 18:29 PDT- Rochester NY- Shield line: https://twitter.com/MaranieRae/status/1302780717601107969?s=20
Day 102 - 18:29 PDT- Rochester NY-  "Wakanada Warriors": https://twitter.com/iammix24/status/1302781640607965185?s=20
Day 102 - 18:30 PDT- Rochester NY-  "elders to the front" : https://twitter.com/tr00p3rr/status/1302782313173069824?s=20
Day 102 - 18:35 PDT- Rochester NY- Drums heard, marching continues
^https://twitter.com/david_andreatta/status/1302783604884410368?s=20
^https://twitter.com/MaranieRae/status/1302813180981391360?s=20
Day 102 - 18:37 PDT- Seattle - dino spottted
Day 102 - 18:38  PDT- Rochester NY- - singing heard by crowd, moving forward with march
^https://twitter.com/AFriendlyDad/status/1302784209832960000?s=20
^which side are you on my people? which side are you on?"
Day 102 - 18:40 PDT Rochester NY: Protesters have arrived at the Public Safety Building: 
^https://twitter.com/RochesterNYPD/status/1302783714569719810?s=20
^https://twitter.com/SCCacti/status/1302784440830173187?s=20
Day 102 - 18:45 PDT- Rochester NY- Elders stand guard: https://twitter.com/WHEC_Moussignac/status/1302784653456060417?s=20
^https://twitter.com/tr00p3rr/status/1302788200403030021?s=20
Day 102 - 18:45 PDT- Rochester NY-  Police protect their building: https://twitter.com/WHEC_Moussignac/status/1302785429733769216
^https://twitter.com/elaadeliahu/status/1302787109993041922?s=20
Day 102 - 18:45 PDT- Rochester NY-  Elders sing "We Shall Overcome"
^https://twitter.com/WXXINews/status/1302781090902441989?s=20
Day 102 - 18:50 PDT- Rochester NY- Protesters have arrived at the building. https://twitter.com/News_8/status/1302787304017231874?s=20
^{another angle: https://twitter.com/tr00p3rr/status/1302787292722012160?s=20 }
Day 102 - 18:50 PDT-  Seattle march, chanting
^"fuck donald trump, we're gotta get him out. we don't want no cops"
Day 102 - 18:50 PDT-- Denver CO - Small group of about 50 protesters have gathered:
^https://twitter.com/AnonyResistance/status/1302782893756801024?s=20
^https://twitter.com/colpeoplespress/status/1302777788269690880?s=20
Day 102 - 18:55 PDT- Rochester NY-
^https://twitter.com/asklair/status/1302787515812806656?s=20
^“The police are protecting a building. That’s what they do. From Walmart to family dollar. They don’t care. They work for companies”
^https://twitter.com/AndrewWHAM/status/1302790675067482112?s=20
Day 102 - 19:00 PDT- Rochester NY- .https://twitter.com/dmlRESISTS/status/1302790104776429570?s=20
Day 102 - 19:05 PDT- Rochester NY- 
^https://twitter.com/kmstraumane/status/1302790427981090816?s=20
^https://twitter.com/SSJRochester/status/1302790114775629824?s=20
^https://twitter.com/tyee23/status/1302790204575670272?s=20
Day 102 - 19:10 PDT- Rochester NY- More speaking in front of PSB
^https://twitter.com/BrianMannADK/status/1302791178648260609?s=20
^https://twitter.com/SCCacti/status/1302791485780365312?s=20
Day 102 - 19:15 PDT- Rochester NY-
Day 102 - 19:20 PDT- Seattle
Day 102 - 19:20 PDT- Denver CO : https://twitter.com/DenverCommies/status/1302713397373353984?s=20
Day 102 - 19:20 PDT- Rochester NY-
^https://twitter.com/FlawIessCowboy/status/1302812838742781953?s=20
Day 102 - 19:40 PDT- Rochester NY-
^https://twitter.com/MaranieRae/status/1302815330973224966?s=20
Day 102 - 19:45 PDT- Rochester NY- Gathering continues with no police action.
^https://twitter.com/JimAroune/status/1302810340372230144?s=20
Day 102 - 19:50 PDT- Eugene OR:
^https://twitter.com/mgbelka/status/1302445754561081345?s=20
Day 102 - 19:50 PDT- Eugene OR: Protesters chanting and marching
^https://twitter.com/LizJone26271417/status/1302812926516948992?s=20
Day 102 - 20:00 PDT-Rochester NY- Crowd still calm. 
^https://twitter.com/ravi_mangla/status/1302793224080297984?s=20
Day 102 - 20:10 PDT Eugene OR - The crowd has stopped in the intersection of 19th and Agate.
Day 102 - 20:20 PDT -Rochester NY - Crowd dancing, singing. Community celebrates itself:
^https://twitter.com/samraforsenate/status/1302809067132514304?s=20
^https://twitter.com/tr00p3rr/status/1302809699063132166?s=20
Day 102 - 22:22 PDT - Rochester NY - One water bottle thrown. Person told to stop by entire crowd
Day 102 - 21:00 PDT- Rochester NY- Crowd remains peaceful.  Gathering continues with no police action.  https://twitter.com/GeofferyRogers/status/1302818056587091971?s=20
^https://twitter.com/JoshuaPotash/status/1302821805040832512?s=20
Day 102 - 21:04 PDT- Denver CO- Protesters are engaged in argument with someone: https://twitter.com/selfdeclaredref/status/1302820439232782342?s=20
Day 102 - 21:05 PDT- . "your white privilege lifestyle is coming to an end"
^https://twitter.com/selfdeclaredref/status/1302821084815937537?s=20
^Fight possible, no visual confirmation.
^Karen alert in Denver
Day 102 - 21:10 PDT- Denver CO - Crowds energy is increasing after altercation, confusion: https://twitter.com/LizJone26271417/status/1302821852671143937?s=20
Day 102 - 21:15 - Something thrown again. told to stop
^Glass Bottle tossed may have been a minto fight in crowd
^More tossed
Day 102 - 21:35 PDT - Los Angeles CA - Protestors arrive at LASD South LA Station.
Day 102 - 21:40 PDT - Portland OR - About 100 protesters have gathered at the N precinct.
^https://twitter.com/PDocumentarians/status/1302830037532459009?s=20
Day 102 - 21:35 PDT - Los Angeles LASD Declare unlawful assembly. - https://twitter.com/desertborder/status/1302828603755782144
Day 102 - 21:42 PDT -  Los Angeles CA - Multiple LA area PDs (Hawthorne and Culver City) roll into LASD South LA Station. Fireworks thrown. Police shoot tear gas and pepper balls. Unclear which happened first. But it seems LASD shot first. - https://twitter.com/waterspider__/status/1302829949359849472 - https://twitter.com/desertborder/status/1302830113772380162 - https://twitter.com/desertborder/status/1302830480367079424
Day 102 - 21:47 PDT - Portland OR - LRAD announcement, reminder not to enter property:
^https://twitter.com/PortlandPolice/status/1302830765097451521?s=20
^Firework? May not be protest related
Day 102 - 21:52 PDT - Portland OR - Mattresses on fire in front of North Precinct. - https://twitter.com/vanromo/status/1302830664199225345 - https://twitter.com/Alice_Evelyn_/status/1302832238531239937 - https://twitter.com/PDocumentarians/status/1302833618939568128
Day 102 - 21:58 PDT - Rochester NY - Protesters chant "fuck the police and Mayor Lovely"
Day 102 - 22:12 PDT - Portland OR - Trumpet man and friend dropping bars and playing. - https://twitter.com/NDpendentPDX/status/1302838949648318465
Day 102 - 22:13 PDT - Los Angeles CA - Police continue to stand guard at LASD South LA Station. Small contingent of protestors still remain.
Day 102 - 22:15 PDT - Rochester NY - Most of the crowd has dispersed. Some protestors are picking up trash as they depart. our city, our streets
^https://twitter.com/JoshNavarroTV/status/1302836900118630400?s=20
Day 102 - 22:16 PDT - Rochester NY - Smaller group remains at police barrier chanting.
^https://twitter.com/NAMJOONSWAPP/status/1302838651450208256?s=20
Day 102 - 22:19 PDT - Portland OR - LRAD announces Portland Fire and Rescue deems fire a danger. Asks protestors to move south.
Day 102 - 22:21 PDT - Portland OR - PPB come out and start pushing people out. Arrest made. - https://twitter.com/garedicus/status/1302839547303276544 - https://twitter.com/PDocumentarians/status/1302840430405414913 - https://twitter.com/NDpendentPDX/status/1302841045307199488
Day 102 - 22:22 PDT - Portland OR - PFR puts out mattress sacrifice. - https://twitter.com/PDocumentarians/status/1302840733330620417
Day 102 - 22:23 PDT - Los Angeles CA - LASD helicopter overhead. Small group of protestors remain.
Day 102 - 22:27 PDT - Portland OR - LRAD announces that PF&R will be exiting. Advises to remain peaceful and not to light fires.
Day 102 - 22:31 PDT - Portland OR - PPB retreat back to the North Precinct. - https://twitter.com/PDocumentarians/status/1302842538068381696
Day 102 - 22:35 PDT - Portland OR - PPB thanks protestors for cooperation. - https://twitter.com/ByMikeBaker/status/1302843385024114688
Day 102 - 22:36 PDT - Rochester NY - RPD tweets a thanks to community elders. Protest "ends". https://twitter.com/RochesterNYPD/status/1302842665311113216?s=20
Day 102 - 22:40 PDT - Los Angeles CA - LASD and allies continue open fire on crowd of protestors. - https://twitter.com/desertborder/status/1302826957386645504
Day 102 - 22:54 PDT - Los Angeles CA - LASD rolling around with snatch vans. - https://twitter.com/desertborder/status/1302847804855836673
Day 102 - 23:11 PDT - Portland OR - LRAD reminds protestors to stay off property.
Day 102 - 23:18 PDT - Portland OR - Someone reportedly down at barricade? (unconfirmed)
Day 102 - 23:32 PDT - Portland OR - Some protestors start marching away from North Precinct. Possibly moving around to the other side of the building.
Day 102 - 23:37 PDT - Portland OR - PPB meet the protestors on the back side of the North Precinct. LRAD advises to remain peaceful and not to light fires. - https://twitter.com/NDpendentPDX/status/1302859120882511874
Day 102 - 23:58 PDT - Portland OR - Lady drives up to protestors to meet someone. Protestors give her a hard time then let her through. - https://twitter.com/Alice_Evelyn_/status/1302865076827820032
Day 103 - 00:00 PDT - Portland OR - LRAD advises protestors that the street is open to vehicular traffic. Lady drives on. No plates.
Day 103 - 00:03 PDT - Portland OR - PPB rush and make targeted arrests. - https://twitter.com/garedicus/status/1302865538444558341 - https://twitter.com/NDpendentPDX/status/1302868638525865984
Day 103 - 00:05 PDT - Portland OR - PPB retreat back onto police property. - https://twitter.com/Alice_Evelyn_/status/1302866296166473728
Day 103 - 00:18 PDT - Portland OR - PPB rush out and arrest Trumpet man. - https://clips.twitch.tv/HeadstrongCrepuscularHawkFreakinStinkin - https://twitter.com/NDpendentPDX/status/1302870034482487296 - https://twitter.com/BGOnTheScene/status/1302877161489985536
Day 103 - 00:25 PDT - Portland OR - No Shoes starts dropping bars right in front of the police line. - https://clips.twitch.tv/SmokyFamousWaterFreakinStinkin
Day 103 - 00:30 PDT - Portland OR - LRAD asking protestors to step back from the PPB line. No Shoes stays on the mic in front.
Day 103 - 00:37 PDT - Portland OR - LRAD announces fall back of line.
Day 103 - 00:39 PDT - Portland OR - PPB start to fall back. Some folks follow. PPB make arrest.
Day 103 - 00:40 PDT - Portland OR - PPB start falling back again.
Day 103 - 00:48 PDT - Portland OR - PPB riot van pulls up. Jumps out. Multiple arrests. Continues to be incredibly aggressive to press and NLG. Includes streamer Rosa En Vivo. - https://clips.twitch.tv/SarcasticBelovedAmazonBudBlast - https://clips.twitch.tv/BelovedSweetClamJKanStyle - https://clips.twitch.tv/ObliqueZealousCheddarSaltBae
Day 103 - 01:00 PDT - Portland OR - Protest winds down. Most folks have dispersed.
Day 103 - 01:17 PDT - DAY 102 to 103 STREAM ENDS
Day 103 - 05:03 PDT - Portland OR - Jail Support Streams starts for arrested protesters (off main woke stream)
Day 103 - 05:45 PDT - Portland OR - Per Rosa they didn't start processing protesters til 5:45 (off main woke stream)
Day 103 - 06:12 PDT - Portland OR - 4 Protesters released (rosa included) (off main woke stream)
Day 103 - 06:48 PDT - Portland OR - PPB or DHS or FPS harasses protesters for cleaning the streets (off streams) https://www.facebook.com/AdamnCostelloTV/videos/307734856989095/
Day 103 - 10:50 PDT - San Fransisco CA - Police block pedestrian entrance into Golden Gate Bridge. https://twitter.com/renepakmorrison/status/1303030185202077697?s=19
Day 103 - 11:00 PDT - San Fransisco CA - Police block R lane on US-101 (North Bay) SB at Midspan, and stopped all SB traffic on the Golden Gate Bridge:
^https://twitter.com/johnstallard/status/1303042602074345477?s=19
Day 103 - 11:20 PDT - CHP stationing down entire SB bridge span, all in riot gear:
^https://twitter.com/bkbkbk/status/1303035782999846913?s=20
Day 103 - 12:00 PDT - San Fransisco CA - Police allow protesters to march on pedestrian walkway. https://twitter.com/renepakmorrison/status/1303046093463191553?s=19
Day 103 - 12:30 PDT - San Fransisco CA - Protesters are seen on the bridge: https://twitter.com/UNAINC/status/1303054337397071873?s=19
^https://twitter.com/API4Biden/status/1303042330480594946?s=19
Day 103 - 12:50 PDT - San Fransisco CA - Heavy police presence still observed, officers in riot gear: 
^https://twitter.com/ginacaliente/status/1303057926664278016?s=20
Day 103 - 12:57 PDT - San Fransisco CA - Police take a bike ride and open lanes back up: https://twitter.com/LuzPenaABC7/status/1303059586232930305?s=20
Day 103 - 13:20 PDT - Seattle WA - Protesters  at Duwamish Longhouse calling to defund SPD:
^https://twitter.com/DecrimSeattle/status/1303066389607923712?s=20
Day 103 - 13:30 PDT - NYC NY - Protesters gather against 'racist rezonings': 
^https://twitter.com/protest_nyc/status/1303068717169999872?s=20
Day 103 - 13:30 PDT - Tampa Bay FL - Protesters gather at Curtis Hixon Park.
Day 103 - 14:18 PDT - Salem, OR - mace and shoving in exchanged between BTB and BLM, the groups seperate on their own. no cops on the scene
Day 103 - 14:28 PDT - Salem, OR - Tensisions still high, groups remain apart for now: https://twitter.com/Clypian/status/1303082507122868224?s=20
Day 103 - 14:29 PDT - Portland OR - Trump supporters continue caravan toward Salem to join pro-Trump groups: https://twitter.com/PDocumentarians/status/1303083079137857536?s=20
Day 103 - 14:45 PDT - Salem OR -Both sides have moved back from the street onto sidewalks in attempt to de-escalate tensions: https://twitter.com/Clypian/status/1303087200318365698?s=20
Day 103 - 15:00 PDT - Salem OR - Both sides remain apart and no further incident noted:
^https://twitter.com/Clypian/status/1303090816278175744?s=20
Day 103 - 15:05 PDT - WOKE is now live
Day 103 - 15:10 PDT - Salem OR - Majority of BLM protesters have left the area. Groups remain apart and calm: https://twitter.com/Clypian/status/1303093017293676544?s=20
^https://twitter.com/Clypian/status/1303093734846783488?s=20
Day 103 - 15:13 PDT - Tampa FL - Small group of protesters march
^https://twitter.com/SheCarriesOn/status/1303093976409542659?s=20
Day 103 - 15:30 PDT - Salem OR - Caravan begins to arrive at Salem pro-Trump rally:
^https://twitter.com/elisa_bleh/status/1303113115295334400?s=20
Day 103 - 15:32 PDT - Tampa FL - Tampa protersters asked to leave private property by security but allowed to stay after discussion
Day 103 - 15:49 PDT - Tampa FL - the group leaves and keeps on marching
Day 103 - 16:00 PDT - Salem OR - Proud boys unveil large American flag on steps: https://twitter.com/bethnakamura/status/1303106241397288960?s=20
Day 103 - 16:05 PDT - Salem OR - Proud boys bull rush BLM, take baseball bat to man, then proud boy punches man on the ground, woman then maces him on the ground:
^https://twitter.com/MrOlmos/status/1303107492096794625
Day 103 - 16:09  PDT - Salem OR - paintballs also reported
^https://twitter.com/Clypian/status/1303108233934991360?s=20
Day 103 - 16:15 PDT - Salem OR - Proud boys told by police to drop their paintball guns: https://twitter.com/Clypian/status/1303109709033910272?s=20
Day 103 - 16:20 PDT - Salem OR -Arrests 
^https://twitter.com/Clypian/status/1303111517227724800?s=20
Day 103 - 16:20 PDT - Salem OR -Police have told protesters to move back to capitol building. Estimate crowd size: 150-200. 
^https://twitter.com/Clypian/status/1303113149642502145?s=20
Day 103 - 16:25 PDT - Salem OR - Paintballs shot as protestors yell “Antifa fake press”: https://twitter.com/Clypian/status/1303113786899927040?s=20
^https://twitter.com/MrOlmos/status/1303113729169485824?s=20
^LA Sheriff's line to restrict protests; press conference set for 16:30 https://twitter.com/RefuseFascismLA/status/1303106617932570624?s=20
Day 103 - 16:30 PDT - Salem OR - antifa guitar: https://twitter.com/MrOlmos/status/1303114254761902080?s=20
^LA: 7 year old who was tear gassed by LASD during BLM protest this last weekend speaks out: https://twitter.com/riotgrrl52/status/1303123366128185344?s=20
Day 103 - 16:30 PDT - Portland OR - Protesters have moment of silence during march.
Day 103 - 16:30 PDT - Salem OR - BLM protester arrested: https://twitter.com/andrewselsky/status/1303117355015315456?s=20
Day 103 - 16:40 PDT - Salem OR - Armed Proud Boys ask & receive stickers from PD.
^https://twitter.com/MrOlmos/status/1303116540351361024?s=20
Day 103 - 16:45 PDT - Los Angeles CA - Barrier present at protest location (precious touches sacred yellow slinky)
Day 103 - 16:30 PDT - Salem OR -Things have calmed down as most BLM supporters left:
^https://twitter.com/Clypian/status/1303117808725704704?s=20
Day 103 - 16:50 PDT -  Salem OR - Proud Boys (possibly the one who punched the BLM supporter) is seen casually talking to PD, no arrest seems to be made.
^https://twitter.com/MrOlmos/status/1303118534059335680?s=20
Day 103 - 16:55 PDT -  Los Angeles CA - tensions rise
Day 103 - 17:00 PDT - Rochester NY - Protesters gather:
^https://twitter.com/Jerickaduncan/status/1303123252932476929?s=20
^https://twitter.com/WHEC_Moussignac/status/1303119915923238914?s=20
Day 103 - 17:05 PDT - Salem OR- Proud Boys scared someone touched their flag:
^https://twitter.com/Clypian/status/1303125170056392704?s=20
Day 103 - 17:10 PDT - Rochester NY - Protesters begin to march: https://twitter.com/GeofferyRogers/status/1303124302640951298?s=20
^https://twitter.com/MaranieRae/status/1303124776890888192?s=20
Day 103 - 17:10 PDT - Salem OR- more arrests made
^https://twitter.com/MrOlmos/status/1303123576086700032
Day 103 - 17:20 - LA, CA - LASD clearing the street infront of the Sheriff's Department before the protest starts without warning or reason given.
Day 103 - 17:24 PDT - Rochester NY - Protesters continue marching toward City Hall. https://twitter.com/tr00p3rr/status/1303134923889487872?s=20
Day 103 - 17:34 - LA, CA - LASD has established perimeter infront of the SD
Day 103 - 17:38 - LA, CA - LASD issues statement via Twitter to protesters:
^https://twitter.com/LASDHQ/status/1303130436789436416?s=20
Day 103 - 17:40 - Seattle WA - March continues 
^https://twitter.com/LizJone26271417/status/1303132058630283264?s=20
Day 103 - 17:45 PDT - Salem OR- Man who assaulted BLM supporter seen freely walking
^https://twitter.com/MrOlmos/status/1303134764652732417?s=20
Day 103 - 17:45 - Rochester NY - Protesters now gathered in front of City Hall.
^https://twitter.com/MaranieRae/status/1303135256166510592?s=20
^https://twitter.com/GeofferyRogers/status/1303137974528475136?s=20
Day 103 - 17:45 - Seattle WA - March continues toward freeway
^https://twitter.com/LizJone26271417/status/1303133000662564864?s=20
Day 103 - 17:50 - Seattle WA - LRAD seen positioned ahead of protesters marching: https://twitter.com/station_static/status/1303133457162223616?s=20
Day 103 - 18:00 - Seattle WA - Marching continues strong:
^https://twitter.com/A_Hungry_Panda/status/1303137071020691456?s=20
^https://twitter.com/LizJone26271417/status/1303136790216208386?s=20
Day 103 - 18:05 - Rochester NY - Protesters sit outside PSB:
^https://twitter.com/childerbrant/status/1303137830827327488?s=20
Day 103 - 18:07 - Rochester NY - Passionate community members speak to the crowd:
^https://twitter.com/AFriendlyDad/status/1303138739481268224?s=20
^https://twitter.com/PBoudreauxNews/status/1303140441928413185?s=20
Day 103 - 22: 05 PDT - Los Angeles CA -.announcing to 'leave parking lot'
Day 103 - 22: 06 PDT - Los Angeles CA 
^https://twitter.com/waterspider__/status/1303198059690487808?s=20
Day 103 - 22: 06 PDT - Los Angeles CA -.cops filming protesters as they push them out of parking lot: https://twitter.com/rise_images/status/1303200048629440512?s=20
Day 103 - 22: 07 PDT - Los Angeles CA -.riot cops take over 7/11 parking lot
Day 103 - 22: 07 PDT - Los Angeles CA - Crowd is dispersed, police make line
Day 103 - 22: 07 PDT - Seattle WA -  TK chased after vehicle taking Tati off to booking. In pursuit, TK was injured. TK taken to Harborview medical center for possible skull fx:
^https://twitter.com/dcatchpole/status/1303219439425302530?s=20
^https://twitter.com/CortanaV/status/1303198075809181699?s=20
Day 103 - 22:12 PDT - Rochester NY - protesters and Police stand down https://twitter.com/WillCleveland13/status/1303198751276888064?s=19
^https://twitter.com/kilian_roc/status/1303198392689086464?s=19
Day 103 - 22: 20 PDT - Seattle WA - People begin to gather in front of Harborview Medical Center.
Day 103 - 22:39 PDT - Seattle WA - Nikkita Oliver has arrived to Harborview in response to TK incident.
^https://twitter.com/NikkitaOliver/status/1303207065553235973?s=20
^https://twitter.com/CortanaV/status/1303205789876645888 TO - Seattle - "SPD sending a tactical task force to Harborview"
Day 103 - 22: 45 PDT - Portland OR - Organizers have announced there will be no direct action this evening. Air quality is poor due to fires in area.
^https://twitter.com/BGOnTheScene/status/1303210137113341952?s=20
^https://twitter.com/Oregonian/status/1303224397277339648?s=20
Day 103 - 22: 45 PDT - Seattle WA - Nikkita Oliver has not been able to make contact:
^https://twitter.com/NikkitaOliver/status/1303207894658162689?s=20
Day 103 - 22: 45 PDT - LA - protesters have dispersed.
Day 103 - 23:01 PDT -Seattle WA - SPD continues to hold down crowd at Harborview.
Day 103 - 23:35 PDT -Seattle WA - 'Rebellion Baby' reaches group at hospital
^https://www.facebook.com/watch/?v=632107607510340&extid=B91S0tSkuK4mVxV1
Day 103 - 23:50 PDT -Seattle WA - Small group still present in front of hosptial.
Day 103 - 23: 50 PDT - Portland OR - No groups organizing in Portland, press confirm.
Day 104 - 00:01 PDT Woke Steam has ended
Day 104 - 00:10  PDT -Seattle WA - Small group still outside hospital, mainly relaxed setting.
^Evening settles.
Day 104 - 12:30 PDT - Rochester NY - Rochester Police Chief La'Ron Singletary and Deputy Chief Morabito announce they are retiring from the RPD. https://twitter.com/whec_bdavidsen/status/1303410934619213824?s=20
Day 104 - 14:00 PDT - Dallas, TX - Dallas Police Chief resigns https://www.documentcloud.org/documents/7203932-Letter-of-Resignation-Chief-Renee-Hall-09-08-20.html
Day 104 - 14:33 PDT - Rochester, NY - Top Rochester Police Officials Are Stepping Down In Response To Daniel Prude's Death - https://www.buzzfeednews.com/article/paulmcleod/rochester-police-officials-resigning-daniel-prude
Day 104 - N/A - Rochester NY - Painting BLACK LIVES MATTER on street
Day 104 - 17:30 PDT - Rochester, NY - 
^https://twitter.com/gsilvarole/status/1303490943132332035?s=20
^https://twitter.com/StatusCoup/status/1303513453903175681?s=20
Day 104 - 19:00 PDT - Rochester, NY -
^https://twitter.com/GeofferyRogers/status/1303514830901575681?s=20
Day 104 - 19:05 PDT - S Los Angeles, CA - Small group of protesters gather at LASD station.
^https://twitter.com/cogeian/status/1303518015137280000?s=20
Day 104 - 19:06 PDT - Rochester NY - People sitting on/inside first barrier. Told to move by organizers
^https://twitter.com/ScooterCasterNY/status/1303524415519502336?s=20
^https://twitter.com/protest_nyc/status/1303523905622216707?s=20
Day 104 - 19:30 PDT - Rochester NY - Painting MURDERER infront of public safety building
^City car in parkinglot being "protected" by members of crowd
Day 104 - 19:30 PDT - Rochester NY - Crowd is moving on and one person gets snatched for pointing a laser before
Day 104 - 19:45 PDT - Rochester NY -
^https://twitter.com/JackWatsonTV/status/1303525014633930758?s=20
^https://twitter.com/ChaseTheArt/status/1303525677547892737?s=20
Day 104 - 19:45 PDT - S Los Angeles, CA - Air circles above area of protest.
^https://twitter.com/alexmce/status/1303524304106090497?s=20
Day 104 - 19:50 PDT - Rochester NY - Completed mural "MURDERERS"
^https://twitter.com/MaranieRae/status/1303530256071102466?s=20
Day 104 - 20:00 PDT - Rochester NY - Speakers on steps, "BLM" flag
^https://twitter.com/protest_nyc/status/1303529996871512064?s=20
Day 104 - 20:09 PDT - Louisville, KY - Stream begins of protest in Louisville
Day 104 - 20:10 PDT - Los Angeles, CA - Protest is declared unlawful assembly; protestors are ordered to leave the area
Day 104 - 20:20 PDT - Los Angeles, CA - Cops advancing to disperse protestors
Day 104 - 20:22 PDT - Los Angeles, CA - Police beat protestors as they advance https://twitter.com/Culpeper20/status/1303536269570367490
Day 104 - 20:22 PDT- Los Angeles CA- riot line rush umbrella line, pepperballs, arrests, teargas out
Day 104 - 20:23 PDT - Los Angeles, CA - multiple arrests made
^flash bangs, LA
Day 104 - 20:25 PDT - Los Angeles, CA - more flash bangs, tear gas (two or three "volleys") https://twitter.com/JustMe_Dillon/status/1303536129707094016?s=20
^https://twitter.com/BillFOXLA/status/1303538503913861123?s=20
^chopper being used
^https://twitter.com/SCCacti/status/1303534957944602624?s=20
^people from residential area coming out to see what's going on, taking pictures
Day 104 - Portland, OR - today's goal is the Transit Police Department
Day 104 - 22:00 PDT - Portland, OR - LRAD warning not to stand on max tracks while standing on the tracks itself https://twitter.com/hungrybowtie/status/1303559721425629185
Day 104 - 22:04 PDT - Portland, OR - march moves onto the next intersection
Day 104 - 22:08 PDT - Portland, OR - LRAD warning to get off the street or be subject to arrest or use of force, the march moves on
Day 104 - 22:09 PDT - Portland, OR - Police chase group of protestors down street
Day 104 - 22:13 PDT - Portland, OR - Protest begins marching forward again
Day 104 - 22:15 PDT - Portland, OR - stop to discuss destination
Day 104 - 22:22 PDT - Portland, OR - march moves on
Day 104 - 22:30 PDT - Portland, OR - stop at intersection/ police line
Day 104 - 22:32 PDT - Portland, OR - pepperballshots, rush, targeted arrest https://twitter.com/gravemorgan/status/1303567148397199361
Day 104 - 22:33 PDT - Portland, OR - At least one arrest
Day 104 - 22:34 PDT - Portland, OR - Police instruct protestors to stay on sidewalk; one protestor remains in street, yelling at police before moving back to sidewalk
Day 104 - 22:39 PDT - Portland, OR - next arrest for being in the street https://clips.twitch.tv/TiredHonorableWoodcockKappaPride
Day 104 - 22:41 PDT - Portland, OR - march moves on
Day 104 - 22:45 PDT - Portland, OR - next stop, riot cops blocking 2 of the possible ways forward, "Fuck Brent Taylor" chants https://twitter.com/hungrybowtie/status/1303570423188041729
Day 104 - 22:53 PDT - Portland, OR - moving on
Day 104 - 23:12 PDT - Portland, OR - march arrived at JC
Day 104 - 23:17 PDT - Portland, OR - LRAD warning to get off the street or be subject to arrest or use of force
Day 104 - 23:18 PDT - Portland OR - Protestors are now marching to Portland City Hall.
Day 104 - 23:45 PDT - Portland OR - No$hu and Trumpet Man start a show. Start getting others to come up and freestyle a bit. - https://twitter.com/MacSmiff/status/1303588541948076032 - https://twitter.com/PDocumentarians/status/1303588213961883648
Day 104 - 23:55 PDT - Portland OR - LRAD advises protestors to stay off the street. - https://twitter.com/PortlandPolice/status/1303587735832150016 - https://twitter.com/hungrybowtie/status/1303589596614201347
Day 105 - 00:08 PDT - Portland OR - PPB announce area is closed and for protestors to leave or subject to arrest/teargas. - https://twitter.com/PortlandPolice/status/1303590665545113600 - https://twitter.com/hungrybowtie/status/1303592009857298432
Day 105 - 00:10 PDT - Portland OR - PPB enter the area and start to attempt to disperse the protestors.
Day 105 - 00:12 PDT - Portland OR - PPB start moving faster to attempt to push protestors faster. - https://twitter.com/PDocumentarians/status/1303595093878685696
Day 105 - 00:15 PDT - Portland OR - PPB push and knock over someone with no provocation. - https://clips.twitch.tv/LightHilariousEyeballPlanking
Day 105 - 00:16 PDT - Portland OR - PPB arrest Tabitha. - https://clips.twitch.tv/TawdryLuckyCroissantKAPOW
Day 105 - 00:28 PDT - Portland OR - protesters are on the march again
Day 105 - 00:28 PDT - Portland OR - cops are rolling out, following the march
Day 105 - 00:47 PDT - Portland OR - https://clips.twitch.tv/SuavePluckyFennelDatSheffy
Day 105 - 00:58 PDT - Portland OR - at least two more arrests made https://clips.twitch.tv/FitShakingSalamanderHotPokket
Day 105 - 01:02 PDT - Portland OR - cops rush to make another arrest, seemingly causing a seizure in the person they tackle
^https://clips.twitch.tv/IcyColorfulWoodpeckerFutureMan https://clips.twitch.tv/StrangeEnticingFriesM4xHeh
Day 105 - 01:08 PDT - Portland OR - the person is taken away on a stretcher by ambulance https://clips.twitch.tv/UnusualMistySushiDuDudu
Day 105 - 01:15 PDT - Portland OR - cops roll out
Day 105 - 10:30 PDT - Seattle WA - Protesters block bridge / highway
Day 105 - 17:25 PDT - NYC
^https://twitter.com/BenDensieski/status/1303855805746286592?s=20
Day 105 - 18:35 PDT -Rochester NY - Protesters moving toward PSB: https://twitter.com/BenDensieski/status/1303869230635454465?s=20
Day 105 - 19:13 PDT - Rochester NY - fence being touched, large amount of riot cops come out of garage at PSB and under the bridge
Day 105 - 19:20 PDT - Rochester NY - Protesters chanting; riot cops stand in line
^https://twitter.com/MaranieRae/status/1303881789891653633?s=20
^Rochester: ASL chanting "why are you in riot gear? I don't see no riot here!"
^https://twitter.com/MaranieRae/status/1303892543520858112?s=20
Day 105 - 20:34 PDT - Rochester NY - Crowd marching away from public safety building toward MLK park
Day 105 - 21:34 PDT - Rochester NY -  Crowd is dispersing from MLK park
Day 105 - 22:00 PDT - Portland OR - Protestors marching towards ICE Facility.
Day 105 - 22:08 PDT - Portland OR - Protestors make it to the ICE facility. Feds waiting at the building in riot gear.
Day 105 - 23:00 PDT - Portland OR - Protestors having a dance party in front of ICE facility. - https://twitter.com/1misanthrophile/status/1303936355928428545
Day 105 - 23:07 PDT - Portland OR - DHS taking pictures of protestors on phone camera. - https://twitter.com/1misanthrophile/status/1303938829028483072
Day 105 - 23:08 PDT - Portland OR - DHS gives warning not to set fire to or damage property. No visible vandalism on stream.
DAY 106 - 00:20 PDT - Portland OR - Protestors and DHS slowly shrinking in numbers.
Day 106 - 00:24 PDT - Portland OR - DHS retreat to inside the building. Small number of protestors still at the facility.
Day 106 - N/A - Portland, OR - https://twitter.com/tedwheeler/status/1304125035578159104?s=19
Day 106 - 18:40 PDT - Lincoln, NE - 5 People are marching after the organizers didn't show up.
Day 106 - 21:00 PDT - TeeRex Ep 1 - Teebs and Arex do a joint stream.
Day 107 - 00:55 - SALEM, OR - CJ is off to go play fireman and save horses and chickens
Day 107 - 12:00 PDT - Los Angeles, CA - LASD forming riot line at NLG press conference https://twitter.com/riotgrrl52/status/1304498506233643008
Day 107 - 12:52 PDT - Los Angeles, CA - LASD keeps moving the slinky forward, dispersing the people from the parking lot, and has conquered a dumpster
Day 107 - 17:06 PDT - New Port Richey, FL - Proud Boys harassing the BLM march, seperated by a police line, one Proud Boy is allowed to come up to the protesters, he "joins" the march, chanting ALM etc.
Day 107 - 17:10 PDT - New Port Richey, FL - Proud boy is sent off by protesters after saying the Nword, cops come up to make sure he's safe (he is)
Day 107 - 17:11 PDT - New Port Richey, FL - other Proud Boys are following the march on the other side of the street
DAY 108 - 14:51 PDT - Los Angeles, CA - car tries to plow through BLM group
DAY 108 - 16:33 PDT - Portland, OR - march arrives at Juvenile Justice Complex
^https://twitter.com/FancyJenkins/status/1304925786713939969?s=20
DAY 108 - 16:43 PDT - New York City, NY - one minute to get off the bridge or be arrested
^half the cops left, one side of George Washington Bridge is blocked
^https://twitter.com/ScooterCasterNY/status/1304930463656673281
Day 108 - 19:04 PDT - Rochester, NY - RPD calling out individual protesters, warning them not to approach the police line or be subject to arrest
Day 108 - 19:10 PDT - Rochester, NY - RPD tells protesters to get out of the intersection Child x Wilder or face arrest
Day 108 - 19:16 PDT - Rochester, NY - community elder trying to talk to the cops, gets no answer
Day 108 - 20:01 PDT - Rochester, NY - charge with batons
Day 108 - 20:02 PDT - Rochester, NY - pepperballs, protesters retreat a bit, but are still on the intersection
Day 108 - 20:48 PDT - Washington, DC - while bike cops are herding the protesters along the street, someone is giving them a quick teach-in about the first amendment
Day 108 - 22:35 PDT - Rochester, NY - cops resume to dispersal after 2.5 hours of peaceful singing by the protesters
Day 108 - 22:36 Remaining 50ish protesters in Rochester retreat and disperse, 1 arrest made. 1 rubber bullet, 1 Pepperball shot
Day 109 - 01: 00 protesters gathered at hospital where LASD sheriffs remain in critical condition after alleged ambush shooting: https://t.co/EjwWVXdL5V
Day 109 - 03:30 PDT - Los Angeles, CA - LASD + LAPD just surrounded Black unity camp at LA city hall. A dispersal order has been given, with no clear route of egress. Cops tell streamer it's "a top secret mission to arrest" people "because they are protesting"
^https://www.instagram.com/p/CFEuHspHx7U/
^https://twitter.com/jintakhan/status/1305094316436549633
DAY 109 - 03:48 PDT - OFF MAIN WOKE STREAM - Los Angeles, CA - Sheriff Busses arrive
Day 109 - 04:20 PDT - Los Angeles CA - LAPD is there as "Security" Keeps sending press back and forth between agencies for information
^https://twitter.com/itsa_talia/status/1305098070288334848?s=19
Day 109 - 06:09 PDT - Los Angeles - LAPD bringing in a unit to cite leftover protesters and press. LAPD tells people to leave or they'll be cited / or arrested
Day 109 - 07:33 PDT - Los Angeles - Shift change new officers "protecting" a public park - some of the old ones are still around/
Day 109 - 07:43 PDT - Los Angeles - LAPD and LASD start getting riot gear on
Day 109 - 08:00 PDT - Los Angeles - LAPD/LASD Charge
Day 109 - 08:00 PDT - Los Angeles - Acatwithnews arrested - and unconcious on the ground
Day 109 - 08:04 PDT - Los Angeles - Next rush and arrest
Day 109 - 08:21 PDT - Los Angeles -  Acatwithnews sitting up now getting looked at by LFD EMTs and put onto a stretcher
Day 109 - 08:34 PDT - Los Angeles - Talia arrested while streaming
Day 110 - 15:30 PDT - Lancaster, PA -Officer involved shooting in Lancaster City; Crowds gathering and beginning to hold protest group. 
^https://twitter.com/AndreaTVNews/status/1305274888555507713?s=20
^https://twitter.com/stillgray/status/1305283017762512896?s=20
DAY 110 - 16:30 PDT - Lancaster, PA - on police car
DAY 110 - 16:30 PDT - Lancaster, PA - car smashed
DAY 110 - 16:35 PDT - Lancaster, PA - crowd in the streets, streams are chaotic
^https://twitter.com/cbergmaga/status/1305289561635827712?s=20
DAY 110 - 16:35 PDT - Lancaster, PA - "lets go" is being announced , not sure what
^https://twitter.com/SerbianSock/status/1305295308780457986?s=20
^Marching to police station?
DAY 110 - 16:35 PDT - Lancaster, PA - smash
DAY 110 - 16:370 PDT - Lancaster, PA - suv on fire
^https://twitter.com/tr00p3rr/status/1305290332561649664?s=20
DAY 110 - 16:45 PDT - Lancaster, PA - light towers
^https://twitter.com/dailydigger19/status/1305298941320232968?s=20
DAY 110 - 17:08 PDT - Lancaster, PA - https://twitter.com/zerosum24/status/1305290012444053504?s=20
DAY 110 - 17:17 PDT -Lancaster, PA - officers in camo inside station with weapons
Day 110 - 22:00 PDT - Lancaster PA - People blocking intersection: https://twitter.com/thelancpatriot/status/1305318599536631815?s=20
^https://twitter.com/selfdeclaredref/status/1305317944105279488?s=20
Day 109 - 18:47 - St. Charles, MO - Cops chasing people for srrests, arrest the only streamer from passenger seat
^https://twitter.com/greg_doucette/status/1305358457810411522
Day 110 - 20:40 PDT - Lancaster PA - Protestors still occupying the streets outside of the Lancaster Bureau of Police building.
Day 110 - 21:20 PDT - Lancaster PA - "Lancaster PA police HQ right now. Getting closer to police lines." - https://twitter.com/thelancpatriot/status/1305360649464303617
Day 109 - 21:27 PDT - Lancaster PA - unlawful assembly declared
Day 109 - 21:27 PDT - Lancaster PA - teargas
^https://twitter.com/ChillStableGuy/status/1305363556389486593 https://twitter.com/thelancpatriot/status/1305363558071496704
^https://twitter.com/ElijahSchaffer/status/1305363622630170626
Day 110 - 21:35 PDT - Lancaster PA - Riot line forming to push down ramp at LPD HQ. Tear gas deployed. - https://twitter.com/thelancpatriot/status/1305365711792091137
Day 110 - 21:37 PDT - Lancaster PA - Riot line starts pushing down the ramp.
Day 110 - 21:42 PDT - Lancaster PA - Riot line continues to push down the ramp. Several injuries from pepper spray and tear gas. Medics attending.
Day 110 - 21:44 PDT - Lancaster PA - LPD fire "less"-lethals at protestors. Protestor injured and carried away.
Day 110 - 21:50 PDT - Lancaster PA - [OFFSTREAM] LPD retreat back to top of ramp after clearing protestors off the ramp.
Day 109 - 22:00 PDT - Lancaster PA - protesters are moving barricades onto the ramp
^https://twitter.com/ChillStableGuy/status/1305370841178349568
Day 110 - 23:03 PDT - Lancaster PA - [OFFSTREAM] - LPD fire tear gas into intersection to attempt to disperse remaining protestors.
Day 110 - 23:16 PDT - Lancaster PA - LPD begin moving towards the intersection firing tear gas, rubber bullets and pepper balls.
Day 110 - 23:29 PDT - Lancaster PA - Protestors rebuild barricade in intersection. Start an urban campfire. - https://twitter.com/CarterLNP/status/1305393462678892546
Day 110 - 23:36 PDT - Lancaster PA - Caravan of Police (State Police + LPD) exit the Police station look to be starting to surround protestors.
Day 110 - 23:53 PDT - Lancaster PA - LPD roll back out into the intersection.
Day 110 - 23:57 PDT - Lancaster PA - LPD rushes out to protestors. At least one streamer tackled and arrested. - https://streamable.com/tcfdnt
Day 111 - N/A - N/A - https://twitter.com/ElijahSchaffer/status/1305403004120686592?s=20
Day 110 - 11:40 PDT - Sacramento, CA - person taken away by ambulance after being - apparently on purpose - hit by a car 
^https://twitter.com/VickiGonzaleztv/status/1305579365636349952
Day 110 - 11:58 PDT - Sacramento, CA - another car plows through the crowd, no serious injuries
Day 110 - 13:00 PDT - Sacramento, CA - cop car plows through the crowd, one person injured https://twitter.com/dootdoot5/status/1305600892817690624
Day 110 - 13:32 PDT - Sacramento, CA - the person injured by the cops  car is taken away by ambulance
Day 111 - 18:45 PDT - Kenosha - activist rumored to have been arrested. Group gathering.
DAY 112 - 06:30 PDT - Rochester NY - Protesters Occupy steps of Public Saftey Building calling for resignation of mayor and other officials
Day 111 - 14:00 PDT - Seattle, WA - planned start of FTP march https://twitter.com/KatieDaviscourt/status/1306045981209714688
DAY 111 - 15:27 PDT - Seattle, WA - 1 arrest at FTP march
DAY 111 - 15:28 PDT - Seattle, WA - cops rush the group on the sidewalk, arrests made
DAY 111 - 15:31 PDT - Seattle, WA - group again rushed, at least 4 arrests
DAY 111 - 15:32 PDT - Seattle, WA - cops chase after remaining group, more arrests
DAY 111 - 16:02 PDT - Seattle, WA - one protester is being tended to by paramedics, ambulance is there https://twitter.com/mikescaturo/status/1306003540771364864
DAY 111 - 16:58 PDT - Philadelphia, PA -  "Trump Pence out now" protest starts marching
DAY 111 - 17:47 PDT - Seattle, WA - seattle cop threatening use of taser at site of former Hyatt sit in
DAY 111 - 18:16 PDT - Philadelphia, PA -  marchers want to go on highway, cops stop most of them
^https://twitter.com/JPeters2100/status/1306039625388118017
DAY 111 - 18:19 PDT - Philadelphia, PA - those who were behind the cop line turn around, march continues in the city
^https://twitter.com/JPeters2100/status/1306040372414558209
DAY 111 - 18:37 PDT - Philadelphia, PA - philly march ends
Day 112 - 21:08 - Rochester NY - occupy street overnight camping infront of city call where protestors took down flag and put up black lives matter flag. they gave the flag back to the police department.
Day 112 - 5:09am PDT - Rochester NY - RPD shows up to clear city hall occupation
Day 112 - 06:14 PDT - Rochester NY - warning to leave the street and get on the sidewalk or face arrest "immediately"
Day 112 - 06:48 PDT - Rochester NY - chud comes in shouting blue lives matter but is quickly removed by cops and apparently arrested
Day 112 - 06:59 PDT - Rochester NY - RPD is erecting a low level fence
Day 112 - 07:16 PDT - Rochester NY - Dr. Myra Brown negotiates 7 volunteers to be allowed to clean up stuff this is left and bring it to her church.
Day 112 - 10:28 PDT - Seattle, WA - protesters blocking exit of I90 tunnel between Seattle and Bellevue
Day 112 - 10:33 PDT - Seattle, WA - altercation with a driver, shortly after the protesters leave
Day 112 - 17:15 PDT - Chicago, IL - 2 protest sites in Chicago: one BLM group at City Hall, one counterprotesting a BTB rally
Day 113 - 14:10 PDT - New York City, NY - multiple arrests at anti-ICE protest, Greenwich and Cortlandt
Day 113 - N/A - N/A - https://twitter.com/protest_nyc/status/1306705861650374657
Day 113 - N/A - N/A - https://twitter.com/rvc330/status/1306706340862140418
Day 113 - N/A - N/A - https://twitter.com/JoshuaPotash/status/1306711002491367426
Day 113 - N/A - N/A - https://twitter.com/protest_nyc/status/1306709993069125634
Day 113 - N/A - N/A - https://clips.twitch.tv/ToughMuddyDunlinPanicBasket
^"we're just doing this to get them off the streets" https://clips.twitch.tv/WonderfulTacitDonutBCWarrior
Day 113 - 14:32 PDT - New York City, NY - LRAD explains the arrests with "failure to walk facing traffic"
Day 113 - 14:38 PDT - New York City, NY - NYPD clearing the sidewalk around the arrests
Day 113 - 14:43 PDT - New York City, NY - another arrest, seemingly randomly picked off the sidewalk
Day 113 - 14:46 PDT - New York City, NY - cop approaches streamer, tells him to keep 6 feet distance or be arrested
Day 113 - 21:27 PDT - Seattle WA - Seattle marching towards one of Jeff Bezos's homes. Police looking to intercept.
Day 114 - 09:50 PDT - Seattle WA -  morning march shuts down intersection close to city hall until cops show up
Day 114 - 14:46 PDT- Manhattan NY - group marching and cops charge/ 1 arrested
Day 114 - 14:49 PDT - Manhattan NY - lrad announces unlawfully walking in road way warning
Day 114 - 14:55 PDT - Manhattan NY - 2nd lrad unlawfully walking in the road way warning
Day 114 - 14:56 PDT - Manhattan NY -  3rd lrad unlawfully walking in the roadway warning
Day 114 - 15:05 PDT - Manhattan NY - another arrest
Day 114 - 15:15 PDT -Manhattan NY - 3rd arrest made
Day 115 - 15:16 PDT - Manhattan NY -  unlawful in the road announcment warning
DAY 114 - 15:36 PDT - Louisville KY - person in car pulls gun out on protesters marching
Day 114 - PDT 15:45 PDT NYC - NY ABOVE ARE ALL NYC ^ BTW - but another push  arrests made approx 8 total now no actual amount.
Day 114 - PDT 15:45 PDT Cops beat protesters indiscriminently
Day 114 - 20:59 PDT - Portland OR - Protestors arrive at ICE facility. Feds make announcement to stay away.
Day 114 - 21:04 PDT - Portland OR - Feds make another announcement to not to attempt to damage the facility.
Day 114 - 21:08 PDT - Portland OR - Feds make another announcement. Also reports of OSP en route.
Day 114 - 21:28 PDT - Portland OR - Rush out of building. Make targeted arrests.
Day 114 - 21:29 PDT - Portland OR - Green gas/smoke out. Pepper balls as feds push protestors away from in front of ICE facility.
Day 114 - 21:32 PDT - Portland OR - Feds start pushing protestors further down the street.
Day 114 - 21:34 PDT - Portland OR - Feds stop push, deploy yellow smoke/gas.
Day 114 - 21:39 PDT - Portland OR - Feds begin a slow retreat. PPB LRAD announces unlawful assembly.
Day 114 - 21:43 PDT - Portland OR - Feds stop retreat. PPB continuing to declare "Unlawful Assembly".
Day 114 - 21:53 PDT - Portland OR - Feds continue retreat to intersection near ICE facility.
Day 114 - 21:57 PDT - Portland OR - Feds continue retreat towards facility.
Day 114 - 22:01 PDT - Portland OR - Feds rush out with pepper balls, bean bags and gas.
Day 114 - 22:02 PDT - Portland OR - Small umbrella shield forms on street. Lots of gas and still lots of munitions from the feds.
Day 114 - 22:05 PDT - Portland, OR - Sustained pepperball shooting (15+ second bursts with ~10 second breaks over the course of several minutes)
Day 114 - 22:06 PDT - Portland OR -  Feds start to march towards shield wall. Continuing onslaught of pepper balls and gas.
Day 114 - 22:14 PDT - Portland, OR - Huge onslaught of munitions: pepper balls, tear gas and other gas (yellow?)
Day 114 - 22:16 PDT - Portland, OR - Police suddenly advance down the block, forcing protestors back
Day 114 - 22:27 PDT - Portland, OR - Large amounts of two gasses deployed (grey, yellow)
Day 114 - 22:30 PDT - Portland, OR - grey gas (tear gas?) and green gas (possibly adamsite?) deployed heavily
Day 114 - 22:30 PDT - Portland, OR - Police appear to assault protestors (need clip if anyone has one)
Day 114 - 22:30 PDT - Portland, OR - Police arrest at least 1-2 protestors
Day 114 - 22:30 PDT - Portland, OR - The bulk of the police advance suddenly on the protestor's line
Day 114 - 22:31 PDT - Portland, OR - Police occupy protestors previous position; grey (tear?) gas still lingers heavily in the air
Day 114 - 22:33 PDT - Portland, OR - Police securing the perimeter of their position (an intersection)
Day 114 - 22:50 PDT - Portland OR - OSP/PPB harassing Dustin (2lesslegs) about opening the fire hydrant.
Day 114 - 22:53 PDT - Portland OR - PPB continues Unlawful Assembly declaration and threaten violence.
Day 114 - 22:59 PDT - Rochester NY - Mass shooting in Rochester. Unclear of details. Multiple dead. Unrelated to protests
Day 114 - 23:48 PDT - Portland, OR - Protest continues at ICE facility (regional HQ?)
Day 114 - 23:56 PDT - Portland, OR - Police advance on protestors and chase them down street away from ice facility
Day 114 - 23:57 PDT - Portland, OR - Police fire pepperball bursts (5 second bursts, ~15 second pauses, continued for ~1 min)
Day 114 - 23:59 PDT - Portland, OR - Police insist protestors move
Day 115 - 00:01 PDT - Portland, OR - Police expanding perimeter, pushing protestors away
Day 115 - 00:04 PDT - Portland, OR - tear gas (grey?), yellow gas
Day 115 - 00:05 PDT - Portland, OR - more yellow, grey gas
Day 115 - 00:06 PDT - Portland, OR - pepperballs, gas cannisters fired
Day 115 - 00:06 PDT - Portland, OR - Police advance down street, steadily firing munitions
Day 115 - 00:07 PDT - Portland, OR - police assault protestor (possibly press), possibly arrest?
Day 115 - 00:08 PDT - Portland, OR - police stop advance at intersection
Day 115 - 00:11 PDT - Portland, OR - intermittent tear gas fired
Day 115 - 00:11 PDT - Portland, OR - tear gas fired, police advance down street
Day 115 - 00:12 PDT - Portland, OR - pepperball volleys as police advance
Day 115 - 00:15 PDT - Portland, OR - police attack protestor, arrest (~1-2 blocks away from main protest)
Day 115 - 00:34 PDT - Portland, OR - tear gas, leaf blower response
Day 115 - 00:37 PDT - Portland, OR - green, grey, yellow gas all fired
Day 115 - 10:12 PDT - Louisville, KY - cop on speaker asks protesters in front of Mitch McConnels house to move onto the sidewalk so the cops don't have to forcibly disperse them
Day 115 - 10:19 PDT - Louisville, KY - first of three official warnings to get off the street
Day 115 - 10:30 PDT - Louisville, KY - after some discussion, protesters clear the street so the cops can leave
Day 115 - 10:35 PDT - NYC, NY - cops rush the protest right as it starts, ~15-20 arrests made https://twitter.com/JoshuaPotash/status/1307373364747669504
Day 115 - 10:42 PDT - Louisville, KY - cops have come back, people stay on the sidewalks
Day 115 - 11:11 PDT - NYC, NY -  protesters are blocking the street by sit-in
Day 115 - 11:12 PDT - Louisville, KY - arrest in Louisville for resisting the order to remove her car
Day 115 - 11:13 PDT - NYC, NY - NYPD starts mast arrest of the sitting people
Day 115 - 12:19 PDT - NYC, NY - the sit in has been arrested (~50-60 additional people)
Day 115 - 13:27 PDT - NYC, NY - NYPD blocking access to Jail support https://www.facebook.com/mark.apolloa/videos/10214748158297781
Day 115 - 13:57 PDT - NYC, NY - dispersal order at Jail support for the area right infront of the JOC, people move behind the fence
Day 115 - 14:16 PDT Woke is live
Day 115 - 17:40 PDT - Los Angeles, CA - Pro-Trump group faces anti-Trump protesters after their march downtown.
Day 115 - 17:40 PDT - Redmond, OR - Pro-Trump group faces anti-Trump protesters.
Day 115 - 17:40 PDT - NYC NY - Protesters on bikes are gathered at street corner, someone seems to be speaking to the crowd.
Day 115 - 17:40 PDT - Washinton DC - Group gathers to mourn the loss or RBG.
^https://twitter.com/JoeKhalilTV/status/1307481277428371460?s=20
Day 115 - 17:45 PDT - Grand Rapids MI - Protesters march
Day 115 - 17:47 PDT - St Petersburg FL - Hundreds gather to honor Justice Ruth Bader Ginsburg:
^https://twitter.com/LuisSantana/status/1307476944196378625?s=20
Day 115 - 18:41 PDT - Los Angeles, CA - Sacred yellow slinky spotted.
Day 115 - 18:42 PDT - Nashville, TN -
Day 115 - 18:42 PDT - Rochester, NY - Crowd listens to speaker
Day 115 - 18:42 PDT - San Diego, CA -
Day 115 - 18:42 PDT - Virginia Beach VA - Protest wraps up.
Day 115 - N/A - N/A - odx dancing https://twitter.com/MathieuLRolland/status/1307551530816548867?s=20
Day 116 - 01:30 PDT - Portland, OR - Cops come out to clear the street
Day 116 - 01:37 PDT - Portland, OR - cops roll out after successfully not having done anything
Day 116 - 11:00 PDT - New York City, NY - march by Extinction Rebellion + BLM under the motto "there is no climate justice without racial justice" starts at Columbus circle
^https://twitter.com/zngrhgh/status/1307743848651685889
Day 116 - 20:00 PDT - Portland OR - Protesters starting to gather at park; are met with a local resident who appears to be aggravated toward protesters.
^https://twitter.com/zerosum24/status/1307880503576530945?s=20
Day 116 - 20:20 PDT - Portland OR - Protesters have left the park and are marching to the home of a local BIPOC family currently being evicted.
^https://twitter.com/R3volutionDaddy/status/1307882583644987393?s=20
Day 116 - 20:45 PDT - Portland OR - Protesters gathered in front of the home at focus.
^https://twitter.com/45thabsurdist/status/1307888678975320064?s=20
Day 116 - 20:45 PDT - Portland OR -  Protesters calling for a sit-in "to stop systemic displacement". “stop the evictions.”
^https://twitter.com/mallisonKATU/status/1307901420184559618?s=20
Day 116 - 20:50 PDT - Portland OR -  Unknown individuals have been documented throwing glass bottles down from a balcony  toward the crowd. ~6 OR 7 bottles have hit the street & neighboring properties. Location identified as North Portland on Mississippi.
^https://twitter.com/45thabsurdist/status/1307890013489618945?s=20
Day 116 - 21:00 PDT - Portland OR - Someone from the group of marchers shoots off several paint balls toward the direction of the individuals who are throwing glass bottles from the balcony: 
^https://twitter.com/FriedrichHayek/status/1307905267346993153?s=20
^Voice from the crowd urges agitated individuals to ignore the balcony people and deescalates the issue.
Day 116 - 21:27 PDT - Portland OR -  Balcony folks from the property gave access to protesters to hang a banner reading “eviction is violence” from the railing of the building. 
^https://twitter.com/45thabsurdist/status/1307899163611262976?s=20
^https://twitter.com/KittyLists/status/1307906221987438592?s=20
^more glass bottles being heard?
^https://twitter.com/KittyLists/status/1307903992282791938?s=20
Day 116 - 21:50 PDT - Portland OR -  Protesters cleaning up glass debris from the bottles that were thrown toward them:
^https://twitter.com/R3volutionDaddy/status/1307906557145800704?s=20
Day 116 - 22:00 PDT - Portland OR - "The family has invited people to camp out on their lot tonight in support. Folks are settling in for the evening."
^https://twitter.com/45thabsurdist/status/1307902125523963905?s=20
Day 116 - 22:12 PDT - Portland OR - Groups dances soulja boy together. vibe is calming down.
Day 116 - 22:20 PDT - Portland OR -  Dancing continues. Good vibe all around.
Day 116 - 22:25 PDT - Portland OR -  Energy seems to be increasing; voices louder.
Day 117 - 08:30 PDT - Charlotte, NC - mass arrest at Jail support 26 or 27 arrests https://www.facebook.com/charlotteuprising/videos/348312163029148
Day 117 - 21:14 PDT - Portland OR - Residents come out of their homes to look at those marching in the street.https://twitter.com/PDocumentarians/status/1308258188429410305?s=20
Day 117 - 21:15 PDT - Portland OR - Protesters marching & chanting.
^https://twitter.com/MrOlmos/status/1308258378213470218?s=20
Day 117 - 21:30 PDT - Portland OR - Protesters arrive at station. 
^https://twitter.com/MrOlmos/status/1308259506590154754?s=20
^https://twitter.com/CommiesLmao/status/1308264495282819073?s=20
Day 117 - 21:35 PDT - Portland OR - https://twitter.com/PortlandPolice/status/1308263835199971330?s=20
Day 117 - 21:45 PDT - Portland OR - LRAD
Day 118 - 18:20 PDT - Seattle city council votes to overturn 3 bills vetod by mayor Durkan.  119825, 119862, and 119863
Day 119 - 10:20 PDT - Louisville KY - Grand Jury indicts LMPD Detective Hankison with 3 counts of Wanton Endangerment (Class D Felony) for shooting into an adjacent apartment.  15k Bond.  No other charges listed for any officers in regards to Breonna Taylor's death.
Day 119 - 10:40 PDT - Louisville KY - Crowd gathered at Bree Way begin to march into the streets, one fire already put out
Day 119 - 11:28 PDT - (Off Stream) Louisville KY - Crowd halts march to get organized, shields in the front and water break after march running for 30+ minutes
Day 119 - 11:31 PDT - (Off Stream) Louisville KY - march continutes and police line follows one block back
Day 119 - 12:31 PDT - Louisville KY - Single Firework/firecracker crowd not happy about it.
Day 119 - 12:45PM PDT - Louisville KY - Police blocking the march, quiet dispersal order.
Day 119 - 12:51PM PDT - Louisville KY - Police reinforcement arriving to front of march.
Day 119 - 12:53PM PDT - Louisville KY - Police pushing/pepperballs, making arrests
^https://twitter.com/bloosemore/status/1308863000758177792?s=20
Day 119 - 13:00 PDT - Louisville KY - woman asks to be arrested, is arrested
Day 119 - 13:03 PM PDT - Louisville KY - LRAD: "if you do not disperse, we will use chemical agents and you will be arrested"
^https://twitter.com/HayesGardner/status/1308869202640539648
Day 119 - 13:07 PDT - Louisville KY - Riot line moving forward, pushing press away. More pepper balls shot, Atleast 20 arrests have been made https://twitter.com/The_lostt_one/status/1308860354005532672?s=20
Day 119 - 13:15 PDT - Louisville KY - police live stream
Day 119 - 13:25 PDT - Louisville KY - riot line advances again
Day 119 - Louisville KY - ambulance was called for one protester who was hit in head (exact time unclear)
Day 119 - 13:56 PDT - Louisville KY - the LMPD LRAD is continuing to tell the few remaining protesters and dozens of press to disperse from where the arrests were made. Large march in another part of the city https://twitter.com/BGOnTheScene/status/1308875281034338304?s=20 + other part of city https://twitter.com/jacobhryan/status/1308873838902620167?s=20
Day 119 - 14:12 PDT - Louisville KY - some lmpd now marching away form arrests?
Day 119 - 14:19 PDT - Louisville KY - people on a roof near where arrests were made
Day 119 - 14:22 PDT - Louisville KY - food being passed out at _ park downtown
Day 119 - 14:22 PDT - Louisville KY - MSM Press kicked out of park?
Day 119 - 14:24 PDT - Louisville KY - Police loadup and move on from mass arrest
Day 119 - 14:46PM PDT - Louisville KY - Riot line shoving and chasing people after small kettle
Day 119 - 15:00PM PDT - Louisville KY - "Curfew" begins in 3 hours
Day 119 - 15:05PM PDT - Louisville KY - Hankison in custody, posts bond and is released https://twitter.com/MarioAndersonTV/status/1308889550253625346
Day 119 - 15:09PM PDT - Louisville KY - LMPD Streamer walks across a group of people being detained sitting on the ground surrounded by police
Day 119 - 15:20PM PDT - Chicago IL - (Off Stream) Small group of protestors close down an intersection https://twitter.com/TylerLaRiviere/status/1308893698382606343
Day 119 - 15:35PM PDT - Louisville KY - Calls for march to take place (to a nondisclosed location) and asks for press to follow
Day 119 - 15:45PM PDT - Philadelphia PA - (Off Stream) Protests gather outside of city hall https://twitter.com/Avi_WA/status/1308899842060582914
Day 119 - 15:45PM PDT - Louisville KY - March begins from park to undisclosed location
Day 119 - 15:50PM PDT - Washington DC - (Off Stream) Group gathers outside of DoJ Headquarters https://twitter.com/JihanAbdalla/status/1308900615138037764
Day 119 - 15:50PM PDT - Louisville KY - Protestor says march is planned for tonight after curfew.  March to begin at 17:30PM PDT. Curfew begins at 18:00PM PDT https://twitter.com/DaltonTVNews/status/1308901681539801090
Day 119 - 16:42 PDT - Louisville, KY - person set fire to windows of Hall of justice, quickly put out https://twitter.com/Julio_Rosas11/status/1308915398595805186 + https://twitter.com/ShelbyTalcott/status/1308917112774299648?s=20
Day 119 - 16:45 PDT - Louisville, KY - dispersal order
^https://twitter.com/Julio_Rosas11/status/1308916834528374786
Day 119 - 16:47 PDT - Louisville, KY - water bottles tossed in response
Day 119 - 16:52 PDT - Louisville, KY - loud bang https://twitter.com/ShelbyTalcott/status/1308917484989353986?s=20
Day 119 - 16:52 PDT - Louisville, KY - trash fire https://twitter.com/phillipmbailey/status/1308917747200425990?s=20
Day 119 - 17:12 PDT - New York City, NY - dearrest (?), cops are retreating out of the crowd
Day 119 - 17:12 PDT - Louisville, KY - explosions (flashbangs); police advance down street
Day 119 - 17:14 PDT - Louisville, KY - more flashbangs; cops continue to advance
Day 119 - 17:15 PDT - Louisville, KY - Kentucky National Guard in a parking garage downtown https://twitter.com/BGOnTheScene/status/1308922456632111104?s=20
Day 119 - 17:17 PDT - Louisville, KY - more flashbangs (aimed at head height); police stopped advance
Day 119 - 17:28 PDT - Louisville, KY - confirmed gunfire, victim currently believed to be police officer  - audio (TW): https://twitter.com/ShelbyTalcott/status/1308928584350924800; https://www.youtube.com/watch?v=PeNJm7WRw-k
^https://www.newsnationnow.com/us-news/2-officers-shot-in-louisville/
Day 119 - 17:31 PDT - Louisville, KY - Ambulance arriving, likely for  gunshot victim
Day 119 - 17:40 PDT - Louisville, KY - one in custody not sure if that is the person involved
Day 119 - 17:50 PDT - Louisville, KY - FBI on scene
^https://twitter.com/BGOnTheScene/status/1308934683225251840?s=20
^scene from hospital https://twitter.com/KatrinaWDRB/status/1308932828143464448?s=20
Day 119 - 18:01 PDT - Louisville, KY - 9pm Curfew now in effect
^Louisville Police Scanner: 18 gunshots fired in a new location. timing unclear but not heard on streamshttps://twitter.com/dhookstead/status/1308933668916920320
Day 119 - 18:01 PDT - Washington, DC - Huge crowed right now estimating about 500-700 protesters as they march away from the white house everyone is dressed in black https://twitter.com/rawsmedia/status/1308934898573627392?s=20 
Day 119 - 18:04 PDT - Washington, DC - Cops have blocked a Black Lives Matter support bus from keeping up with the protesters https://twitter.com/CheyannaMarie97/status/1308935686767214598?s=20
Day 119 - 18:30 PDT - Louisville, KY - smoke in Louisville (may be a garbage fire)
Day 119 - 18:32 PDT - Louisville, KY - arrests made a hospital https://twitter.com/ShelbyTalcott/status/1308942337968660482?s=20
Day 119 - 18:43 PDT - Louisville, KY - more gun fire- regg stream
Day 119 - 18:46 PDT - Atlanta, GA - Bearcat APC /riot line
Day 119 - 18:48 PDT - Atlanta, GA - smoke by police line, may be incense
Day 119 - 18:54 PDT - Louisville, KY - (OFF-STREAM) Scanner: 30 to 40 heavily armed individuals setting up on a roof
Day 119 - 19:05 PDT - Atlanta, GA -George State Patrol and other officers begin to put on protective gear, gas masks.
Day 119 - 19:10 PDT - Altanta, GA - Officers begin arrests, 3-4 at a time.
Day 119 - 19:13 PDT - Altanta, GA - One woman/femme resists arrest and runs off.
Day 119 - 19:15 PDT - Altanta, GA -Officers have dispersed majority of crowd from street and have most of the protesters moved onto the sidewalks. Arrests continue.
Day 119 - 19:15 PDT - Altanta, GA -Medic arrested.
Day 119 - 19:15 PDT - Altanta, GA - Individual who previously ran away from arrest is shown being arrested on the ground. Crowd very loud in response to arrest.
Day 119 - 19:29 PDT - Louisville, KY - first unlawful announcement in a while. no movement from the cops
Day 119 - 19:37 PDT - San Diego, CA - Calls for a medic, possible physical altercation
Day 119 - 19:42 PDT - Louisville, KY - Water bottle tossed, pepperballs shot. police stay put
Day 119 - 19:53 PDT - Louisville, KY - LMPD riot line moves up
Day 119 - 19:57 PDT - Louisville, KY - police advancing; attempting to kettle
Day 119 - 20:01 PDT - Louisville, KY - pepperballs at kettled protesters
Day 119 - N/A - Buffalo NY - truck dived into crowd, shots fired (lack more details)https://twitter.com/FJNewsReporter/status/1308969145489395712?s=20
Day 119 - N/A - Vegas NV - earlier shooting?
Day 119 - N/A - Denver -  car drives thru crowd? https://twitter.com/ShellyBradbury/status/1308968971287384064?s=20
Day 119 - 20:30 PDT - Louisville, KY - Reports of looting  https://twitter.com/AmericanVoice18/status/1308989701706182659?s=20 (time of video unclear)
Day 119 - 21:08 PDT - Denver, CO - denver? smoke maybe teargas
Day 119 - 21:11 PDT - Denver, CO - pepperballs
Day 119 - 21:12 PDT - Seattle, WA - violent arrest
Day 119 - 21:15 PDT - Denver, CO - unlawful assembly
Day 119 - 21:15 PDT - Portland, OR - smoke/gas, flashbang
Day 119 - 21:15 PDT - Portland, OR - riot line push
Day 119 - 21:15 PDT - Portland, OR - firework
Day 119 - 22:17 PDT - Los Angeles, CA - LAPD start to form line in front of protestors.
Day 119 - 22:25 PDT - Los Angeles, - CA Protestors march away from LAPD HQ.
Day 119 - 22:19 PDT - Portland, OR - Justice center awning on fire
Day 119 - 22:30 PDT - Portland, OR - PPB storm in, smoke
Day 119 - 22:30 PDT - Portland, OR - big fire (accelerant) molotov https://twitter.com/piercesinggih/status/1309002653482053636?s=20
Day 119 - 22:34 PDT - Portland, OR - unlawful assembly , flashbangs being tossed
Day 119 - 22:40 PDT - Portland, OR - riot line advancing, arrests being made
Day 119 - 22:40 PDT - San Diego, CA - riot line advancing, arrests being made, at least one SDPD cop with what looks to be a live ammo gun
Day 119 - 22:48 PDT - Portland OR - Riot declaration. Giving dispersion orders.
Day 119 - 22:49 PDT - Portland OR - PPB rush out and assault protestors, make no arrests.
Day 119 - 22:50 PDT - Portland OR - PPB push Claudio from cascadianphotog, broke her ankle. - https://twitter.com/1misanthrophile/status/1309008605543362561 - https://clips.twitch.tv/LittleThirstyChimpanzeeOpieOP
Day 119 - 22:55 PDT - Portland OR - PPB pushing protestors out. Gas and peppers and flash bangs.
Day 119 - 22:58 PDT - Portland OR - PPB attacking press. Beating protestor. - https://clips.twitch.tv/HelpfulProudAmazonSquadGoals - https://clips.twitch.tv/OilyAlertSrirachaTheThing
Day 119 - 23:01 PDT - Portland OR - PPB firing more gas and pepper balls. - https://clips.twitch.tv/HelplessLitigiousOilCurseLit
Day 119 - 23:03 PDT - Seattle WA - SPD and facing off with protestors.
Day 119 - 23:07 PDT - Portland OR - Portland Feds Riot line advancing, pepperballs
Day 119 - 23:16 PDT - Seattle WA - Protestors are back at the East Precinct. Umbrella wall formed and barricade being formed. - https://twitter.com/station_static/status/1309019371294031874
Day 119 - 23:18 PDT - Portland OR - PPB and feds start to pull back after pushing protestors to the West.
Day 119 - 23:21 PDT - Portland OR - Feds fire many riot munitions at protestors while retreating.
Day 119 - 23:28 PDT - Portland OR - Feds still falling back. Continuing to unload riot munitions as they retreat.
Day 119 - 23:30 PDT - Louisville KY - Rob Barker streaming from lockup.
Day 119 - 23:32 PDT - Portland OR - PPB rushing somewhere on foot after driving in.
Day 119 - 23:37 PDT - Portland OR - Protestors being detained.
Day 119 - 23:41 PDT - Portland OR - Seattle, WA - fire in street by western barricade
Day 120 - 00:25 PDT - Seattle, WA - next one does
Day 120 - 00:30 PDT - Seattle, WA - arrest made
Day 120 - 00:41 PDT - Seattle, WA - another arrest in Seattle
Day 120 - 00:49 PDT - Seattle, WA - cops appear to be calling it a night
Day 120 - 15:03 PDT - Louisville, KY - Ian released
Day 120 - 15:25 PDT - Louisville, KY - more released?
Day 120 - 18:10 PDT - Louisville, KY - Arrests start, Someone arrested with ar-15? Several dozen protesters seem to be surrounded.
Day 120 - N/A - Louisville, KY - First Unitarian Church has offered sanctuary to a large group of protesters, to loophole the curfew
^Rochester protest arrives at PSB and no cops outside and none on bridge. New camera installed across the street and drones overhead, but that is it.
Day 120 - 18:51 PDT - Louisville KY - LMPD makes an arrest rather forcefully possible seizure?
Day 120 - 20:40 PDT - Louisville KY - Militia patrolling streets https://twitter.com/BGOnTheScene/status/1309333669451108353
Day 120 - 20:55 PDT - Los Angeles - Person hit by vehicle - NSFL: https://twitter.com/jessicarayerog1/status/1309347382308401153?s=20
Day 120 - 21:03 PDT - N/A - Firefirghters arrive to help
Day 120 - 23:40 PDT - Portland, OR - Multiple arrests (possibly 7?)
Day 120 - 23:48 PDT - Portland, OR - Police attack and arrest two protestors
Day 121 - 00:11 PDT - Seattle, WA - Several rounds of flashbangs fired; police advance
Day 121 - 00:13 PDT - Seattle, WA - More flashbangs; police continue advance
Day 121 - 00:19 PDT - Seattle, WA - Police retreat, leave the area
Day 121 - 00:29 PDT - Seattle, WA - Police arrive, pushing protestors back
Day 121 - 15:53 PDT - Louisville, KY - riot cops form line to stop the march
Day 121 - 15:55 PDT - Louisville, KY - cops advance from another side, flashbangs
Day 121 - 16:01 PDT - Louisville, KY - the way back is blocked by a cop line, too. the completely peaceful protest is kettled.
Day 121 - 16:04 PDT - Louisville, KY - organizer is asking people to go to their cars and stay on the sidewalk.
Day 121 - 16:04 PDT - Louisville, KY - people have left the Kettle and are going to the square to regroup
Day 121 - 17:24 PDT - Louisville, KY - Louisville is marching again
Day 121 - 17:55 PDT - Louisville, KY - marchers have reached the Church
Day 121 - 19:17 PDT - Louisville, KY - unlawful assembly declared
Day 121 - 19:31 PDT - Louisville, KY - (some?) people are marching again, away from the cops
Day 121 - 20:35 PDT - San Diego, CA - SDPD forming a bike line to protect a pro-trump provocateur
^https://streamable.com/4qkgw1
^https://streamable.com/1l0zlk
Day 121 - 21:05 PDT - Los Angeles - LA (WEHO) protesters arrive at WEHO Sheriffs station and the sacred slinky is already deployed
Day 121 - 21:05 PDT - Los Angeles -LASD Declared it an immediate unlawful assembly
Day 121 - 21:10 PDT - Los Angeles -  1 Min left of warning time to disperse
Day 121 - 21:12 PDT - Los Angeles - media and most protesters disperse to the:point_left:West
Day 121 - 21:35 PDT - San Diego, CA - bike cops out en masse
Day 121 - 21:37 PDT - San Diego, CA - bike cops following the remaining protesters
Day 121 - 21:40 PDT - San Diego, CA - cops pushing protesters on the sidewalk
Day 121 - 21:41 PDT - San Diego, CA - cops attack the protesters with bikes
Day 121 - 21:42 PDT - San Diego, CA - 3-4 arrests, cops completely blocking the view
Day 121 - 21:48 PDT - Los Angeles CA - Arrests.
Day 121 - 21:50 PDT - Los Angeles CA - LASD firing pepper balls, arrests. LASD assaults a protestor with a riot shield. - https://mobile.twitter.com/PplsCityCouncil/status/1309727474696089600 - https://twitter.com/PplsCityCouncil/status/1309729421947883521 - https://twitter.com/desertborder/status/1309716359517929473 - https://twitter.com/jttv1005/status/1309735940068433920
Day 121 - 21:51 PDT - San Diego, CA - SDPD rolling out
Day 121 - 21:51 PDT- Los Angeles, CA - Police fire flashbangs
Day 121 - 21:54 PDT - Los Angeles CA - Protestors continue to run to avoid police violence.  LASD riot squad pursuing.
Day 121 - 22:08 PDT - Sacramento CA - Protestors line up against Sacramento Police (SacPD).
Day 121 - 22:11 PDT - Sacramento CA - Protestors start to march away. SacPD also starts to pull back.
Day 121 - 22:13 PDT - Sacramento CA - Protestors start to form barriers and line up again.
Day 121 - 22:14 PDT - Sacramento CA - Protestors start to march away again after forming barricades.
Day 121 - 22:21 PDT - Sacramento CA - Protestors continue to march away from previous confrontation. SacPD follows behind.
Day 121 - 22:24 PDT - Los Angeles CA - cops searching white & black truck from the protest under a gas station awning. KTLA helicopter stream.
Day 121 - 22:30 PDT - Sacramento CA - Protestors run into another police riot line.
Day 121 - 22:48 PDT - Sacramento CA - Protest organizers discussing with SacPD why they aren't being allowed to march.
Day 121 - 23:09 PDT - Sacramento CA - SacPD stop the kettle and allow protestors to march away.
Day 121 - 23:20 PDT - Sacramento CA - Protestors continue to march. SacPD move quickly to attempt to direct traffic in each intersection.
Day 121 - 23:22 PDT - Sacramento CA - Protestors encounter SacPD who attempt to stop the march. Protestors allowed to continue.
Day 121 - 23:32 PDT - Sacramento CA - March winding down and protestors exiting the area.
Day 121 - 23:38  PDT Woke Stream has ended for the night
Day 122 - Rochester NY - Rochester Mayor Lovely Warren appoints new interim police chief Cynthia Harriet Sullivan as the city’s new police chief, effective October 14th, 2020. 
^https://youtu.be/EEV9JWQT7BQ
Day 122 - 11:43 PDT - NATICK MA - Diana ploss gets yelled at by the cops
Day 122 - 15:01 PDT - Yorba Linda, CA - Physical altercation between streamer and protestors (BLM) on one side and counterprotestors (BTB) on the other
Day 122 - 15:04 PDT - Yorba Linda, CA - BLM protestors attempt to get police nearby for aid; BLM protestors are pepper-sprayed (unknown if BTB or police)
Day 122  - Yorba Linda, CA - (thread) tensions between the groups and pics of car situation(edit later for description): https://twitter.com/Brian_Rokos/status/1309974101016981504?s=20
^https://youtu.be/-Hmfa3OIhhE
Day 122 - 15:15 PDT - Yorba Linda, CA - Another heated argument between the groups.
Day 122 - 15:16 PDT - Yorba Linda, CA - Police scattered throughout street/intersection to keep groups separated as tensions rise.
Day 122 - 15:23 PDT - Yorba Linda, CA - Arrest made, seems to be pro-trump protester.
Day 122 - 15:30 PDT - Yorba Linda, CA - trumpsters rally declared unlawful assembly
Day 122 - 15:30 PDT - Yorba Linda, CA - 'latino' guy explains 'all lives matter' to streamer.
Day 122 - 15:45 PDT  - Louisville KY-  Protesters marching in streets.
Day 122 - 17:30 PDT  - New York City, NY - LRAD telling people to clear the street but also not use the entire sidewalk
Day 122 - 18:05 PDT - Louisville (KY), Rochester (NY), Seattle (WA), Dallas (TX) all marching
Day 122 - 18:15 PDT - Louisville, KY- Houseless man is arrested for 'breaking curfew'.
^https://twitter.com/KallieECox/status/1310027567446065152?s=20
Day 122 - 18:25 PDT - Louisville, KY- Hyatt Regency under Nat Guard watch.
^https://twitter.com/BGOnTheScene/status/1310027534311084032?s=20
Day 122 - 19:04 PDT - Seattle, WA - Cops walk up to the protesters who erected a burning barricade, declare unlawful assembly immediately
Day 122 - 19:11 PDT - seattle police line advances on protestors, firing various munitions
Day 122 - 19:13 PDT - Seattle, WA - multiple arrests
Day 122 - 19:46 PDT - Seattle, WA - cops clear the barricade
Day 122 - 19:49 PDT - Seattle, WA - cops beat up people with their bikes and make arrests, including one medic
Day 122 - 20:14 PDT - Rochester NY -  Organizer? tells everyone to be quiet(off woke audio but on stream)
Day 122 - 20:15 PDT - Rochester NY - protesters go back to chanting, Breonna Taylor :drum: Daniel Prude :drum:  (off woke audio but on stream) then go quiet again
Day 122 - 21:00 PDT - Portland, OR - LRAD prompting the protesters to leave the street in front of IJC
Day 122 - 21:14 PDT - Portland, OR - cops approach, people leave the street
Day 122 - 21:16 PDT - Portland, OR - multiple arrests, presumably for being in the street
Day 122 - 21:20 PDT - Portland, OR - Protesters chant while PPB continue arresting people.
^https://twitter.com/piercesinggih/status/1310071829713752065?s=20
^At least 100 officers are estimated to be present.
^https://twitter.com/GriffinMalone6/status/1310072459056431104?s=20
^https://twitter.com/SVNewsAlerts/status/1310072277279682561?s=20
^https://twitter.com/_WhatRiot/status/1310072088569364486?s=20
Day 122 - 21:23 PDT - Portland, OR - cops snatching people from the sidewalks and arrest them https://clips.twitch.tv/LachrymosePunchyLeopardRlyTho
Day 122 - 21:37 PDT - Portland, OR - cops rush, make some more arrests
Day 122 - 21:47 PDT - Portland, OR - next rush on the sidewalk, more arrests
Day 122 - 21:50 PDT - Portland, OR - cops rush into the park
Day 122 - 22:12 PDT - Portland, OR - cops roll out
Day 122 - 22:43 PDT - Portland, OR - flashbang + smoke to cover the riot van roll out
Day 122 - 22:45 PDT - Sacramento, CA - Protesters face off large line of officers.
^https://twitter.com/99_goodman/status/1310092236298698754?s=20
Day 122 - 23:21 PDT - Portland, OR - PPB is back and telling people to leave the road again
Day 122 - 23:40 PDT - Portland, OR - cops come in, people leave the street
Day 122 - 23:41 PDT - Portland, OR - PPB makes more arrests
Day 122 - 23:51 PDT - Portland, OR - unlawful assembly declared, cops push the protesters west and north
Day 122 - 23:56 PDT - Portland, OR - cops arrest and brutalize an apparently houseless person
Day 122 - 23:57 PDT - Portland, OR - cops pushing and beating person marked as press
^https://twitter.com/MrOlmos/status/1310116575668658176
Day 123 - 00:04 PDT - Portland, OR - person is carried into the paddy wagon
Day 123 - 00:07 PDT - Portland, OR - Police advance, pushing protestors down street
Day 123 - 00:12 PDT - Portland, OR - Police aggressively advancing again
Day 123 - 00:17 PDT - Portland, OR - Police retreat, leave area
Day 123 - 14:55 PDT - Los Angeles, CA - Small group of protesters gathered at street corner: https://twitter.com/Jechava/status/1310337581259739136?s=20
Day 123 - 16:30 PDT - Gainesville, TX - Small group of protesters march in residential neighborhood.
Day 123 - 16:30 PDT - Seattle, WA - Good  sized crowd have organized in the streets
^https://twitter.com/00Faria/status/1310359168092528641?s=20
Day 123 - 17:13 PDT - Woke stream starts
Day 123 - Washington DC - several arrests made https://twitter.com/rawsmedia/status/1310039420716888066?s=20 + https://twitter.com/rawsmedia/status/1310092937670340621?s=20
Day 123 - 19:25 PDT -  Kenosha, WI and Portland, OR - Small groups remain gathered, listening to speakers.
Day 123 - 19:30 PDT -  Louisville, KY - March begins to near the end. 
^https://twitter.com/BGOnTheScene/status/1310404142523973632?s=20
Day 123 - 19:35 PDT -  Louisville, KY - Two small groups engage in heated argument. Verbal encounter only.
Day 123 - 19:30 PDT -  El, Cajon, CA - Decent sized group marches in residential neighborhood.
^https://twitter.com/DuvalinPapi/status/1310410184049664003?s=20
Day 123 - 19:42 PDT -  Louisville, KY - Female/femme individuals join the argument. Streamer gives space/privacy.
Day 123 - 20:00 PDT - Portland, OR - Protesters gathered to watch a ...movie?
Day 123 - 20:02 PDT - El Cajon, CA - March has taken a stop at an intersection where protesters are chanting and blocking some minimal traffic.
Day 123 - 20:05 PDT -  Kenosha, WI - Speeches have turned to music/rapping.
^https://twitter.com/canadarcho/status/1310427287024791552?s=20
Day 123 - 21:30 PDT - El Cajon CA - Protestors continue to march without much incident.
Day 123 - 21:30 PDT - Sacramento CA - Protestors marching through the streets.
Day 123 - 21:42 PDT - El Cajon CA - Protestors encounter group of 20-30 chuds chanting "USA".
Day 123 - 21:47 PDT - El Cajon CA - Protestors reroute their march. Chuds stand around confused.
Day 123 - 21:50 PDT - El Cajon CA - March wraps up and protestors disperse.
Day 123 - 21:53 PDT - Sacramento CA - Protestors continue to march. Continue to be trailed by SacPD keeping an eye on things, but no real encounters.
Day 123 - 22:15 PDT - Sacramento CA - March stops for several speeches.
Day 123 - 23:14 PDT - Sacramento CA - Protestors start to march after an hour of speeches.
Day 124 - 00:15 PDT - Seattle WA - SPD roll up with 8 vehicles on about a dozen protestors.
Day 124 - 00:30 PDT - Seattle WA - SPD roll out. Protestors march away shortly after.
Day 124 - 18:40:05 One protester arrested - Louisvile KY - Off main woke stream
Day 124 - 19:30 PDT - Providence, RI - cops harassing the march, massive use of pepperspray, reportedly 2 or 3 arrests. Press maced and threatened with arrest. (off main woke stream)
Day 124 - 19:50 PDT - Providence, RI - cops rolling out
Day 124 - 21:11 PDT - Portland OR - Police sweep park
^https://twitter.com/TheRealCoryElia/status/1310795039749013505?s=20
Day 124 - 21:22 PDT - Portland, OR - PPB continue to sweep park, destroying signs and pushing people away from voting registration booth.
^https://twitter.com/PortlandPolice/status/1310804765400395776?s=20
^https://twitter.com/Oregonian/status/1310816680327741442?s=20
Day 124 - 22:15 PDT - Portland, OR - Police announce closure of sidewalk & give use of force warning.
^https://twitter.com/MrOlmos/status/1310810501421563905?s=20
Day 124 - 22:30 PDT - Portland, OR -  Officers make several arrests.
^https://twitter.com/PDocumentarians/status/1310813282505089024?s=20
Day 124 - 23:00 PDT - Portland, OR - PPB begin to retreat.
^https://twitter.com/1misanthrophile/status/1310823590606958593?s=20
Day 124 - 23:00 PDT - Portland, OR - Protesters regroup together, listen to musicians.
Day 124 - 23:20 PDT - Seattle, WA - Bike cops line up around the East Precinct.
Day 124 - 23:30 PDT - Portland, OR - Arrest being made in front of 7/11 ?
Day 124 - 23:31 PDT - Portland, OR -Mace/ pepperspray? used outside 7/11
Day 124 - 23:32 PDT - Portland, OR -OC; LRAD dispersal order.
Day 124 - 23:41 PDT - Portland, OR -2nd LRAD dispersal order.
Day 125 - 00:04 PDT - Portland OR - PPB LRAD issues order to disperse from 7/11 and Heavenly Donuts or be subject to arrest.
Day 125 - 00:07 PDT - Portland OR - PPB make targeted arrests in 7/11 parking lot. Arrests include streamer dakisback.
Day 125 - 00:12 PDT - Portland OR - PPB make another arrest.
Day 125 - 00:13 PDT - Portland OR - LRAD makes announcement regarding restriction on press.
Day 125 - 00:13 PDT - Portland OR - PPB arrest Dustin.
Day 125 - 00:45 PDT - Los Angeles (Vernon) CA - Protestors at Farmer John Meat Packing Plan chained themselves to the gates to block entry of trucks.
Day 125 - 13:30 PDT - New York, NY - XR NY gets an unlawful obstructing pedestrian traffic LRAD announcement. Theres about 10 XRs and 20 cops (off woke )
Day 125 - 13:47 PDT - New York,  NY - 4 XRs arrested, cops had trouble cutting off the chains - their gas powered generator ran out of power. (off woke )
Day 125 - 13:51 PDT - New York, NY -  XRs start chanting who you protect who do you serve :monkaHMM:
Day 125 - 14:04 PDT - second round of XR arrests look like they're arresting an old man and a hare krishna
Day 125 - 19:10 PDT - Sacramento, CA - Protesters meet and listen to passionate speakers. Crowd smaller than normal.
Day 125 - 19:10 PDT - Eugene, OR- Protesters march down street. Appears to be a residential area.
Day 125 - 21:00 PDT - Eugene, OR- Marching continues; protesters chant in intersections.
^https://twitter.com/MichelleInHell1/status/1311169005500223489?s=20
Day 125 - 21:15 PDT - Eugene, OR- Marching continues; protesters chant for people to wake up and join them in the streets.
Day 125 - 22:07 PDT - Portland, OR - Officers swarm onto the street, toward a grey vehicle near where the protesters are grouped on the sidewalk. Apparently, this car is the focus on an investigation for a possible parking violation? the vehicle appears to have been parked for some time and is "suspicious".
Day 125 - 22:15 PDT - Portland, OR -LRADmobile rolls out in front of protester group.
Day 125 - 22:16 PDT - Portland, OR - LRAD "officers are conducting an investigation..." announcement. x2
^Protesters continue trying to interact/verbally engage with the officers. Eventually give up.
Day 125 - 22:20 PDT - Portland, OR - At least 2 dozen officers are grouped at this vehicle in riot gear.
Day 125 - 22:27 PDT - Portland, OR - Car being "investigated" is towed away. Confirmed vehicle belongs to an individual familiar with the protest group.
^https://twitter.com/PDXGabs/status/1311187500715524096?s=20
Day 125 - 22:36 PDT - Portland, OR - LRAD "officers are disengaging...you must remain on the sidewalk..." announcement. x3
^Brent Taylor spotted near tow truck: https://twitter.com/Cascadianphotog/status/1311177312956608512?s=20
Day 125 - 22:55 PDT - Portland, OR -Protesters remain at the Penumbra Kelly building.
^https://twitter.com/SerbianSock/status/1311181273847803904?s=20
^https://twitter.com/PDocumentarians/status/1311183340888752128?s=20
Day 125 - 23:31 PDT - Portland, OR - Several police vehicles roll out of the station parking lot.
Day 125 - 23:32 PDT - Portland, OR - LRAD "the Penumbra Kelly building is closed....you must leave" announcement. x3
Day 125 - 23:42 PDT - Portland, OR -  Officer #66 targets protester and rushes at him. weird interaction. 66 smiles as he walks back.
Day 125 - 23:45 PDT - Portland, OR - Crowd begins thinning out, police remain in area.
Day 126 - 19:44 PDT - Springfield OR - Mace used from counter protestor
^https://twitter.com/jwcroxton/status/1311508597117837313?s=20
DAY 126 - 21:12 PDT - Portland OR - Patrick Kimmons's mother speaks to crowd.
DAY 126 - 21:12 PDT - Springfield, OR - The "official" protest is over. Some "...fair amount of confrontation as the two groups disperse..." noted:
^https://twitter.com/CFrancisOLeary/status/1311517523502743553?s=20
Day 126 - 22:15 PDT - Sacramento CA - Protestors marching in Sacramento.
Day 126 - 22:20 PDT - Seattle CA - SPD Bike cop gang rolling around.
Day 127 - 08:18 PDT - Rochester, NY - police arresting protesters outside the Presser by the suspened RPD cops
^https://twitter.com/WillCleveland13/status/1311685535665192962
^https://twitter.com/WillCleveland13/status/1311685754091974656
^https://twitter.com/WillCleveland13/status/1311686174763778048
^https://twitter.com/WillCleveland13/status/1311691278061629442?s=19
Day 127 - 10:05 PDT - New York City, NY -around 12 arrests at housing protest in new york for placing furniture on the street 
^https://twitter.com/housing4allNY/status/1311702472835117057
^https://twitter.com/sydneyp1234/status/1311712345845006338
Day 127 - 21:54 PDT - Trump tests positive for COVID-19. - https://twitter.com/realDonaldTrump/status/1311892190680014849
^RNC chair also tests positive for Covid https://www.nytimes.com/2020/10/02/us/elections/ronna-mcdaniel-chairwoman-of-the-rnc-tests-positive-for-the-coronavirus.html
^Kellyanne Conway has covid
^https://twitter.com/JamieMcCarty/status/1312207606430138368?s=20
Day 128 - Louisville KY - Breonna Taylor grand jury recordings released https://www.bbc.com/news/world-us-canada-54391432
day 128 - 11:53 AM PST- NYC NY - Protesters occupy inside of sheraton and outside. 1 arrested so far
day 128 - 11:54 AM PDT- NYC NY - 2 more arrested and walked out
day 128 - 11:55 AM PDT- NYC NY - 2 more arrested and walked out while chanting as they get led out
day 128 - 11:57 AM PDT- NYC NY - 1 more arrested and walked out
day 128 - 11:58 AM PDT- NYC NY - 2 more arrested and walked out i think there was another one but i turned away for a second
day 128 - 12:00 PM PDT- NYC NY -2 more arrested and walked out
day 128 - 12:03 PM PDT- NYC NY -1 more arrested and walked out
day 128 - 12:04 PM PDT- NYC NY -2 more arrested and walked out while shouting and chanting  CARE NOT COPS HOMES NOT SHELTERS
day 128 - 12:07 PM PDT- NYC NY 1 more arrested and walked out
day 128 - 12:11 PM PDT- NYC NY 2 more arrested and walked out chanting  CARE NOT COPS HOMES NOT SHELTERS
day 128 - 12:12 PM PDT- NYC NY Last one more arrested and walked out
^17 (18) in total arrested
day 128 - 11:53 AM PST- NYC NY - Protesters occupy inside of sheraton and outside. 1 arrested so far
DAY 128 - 12:26 PDT - NYC NY - Protesters that were arrested rock the transport bus
DAY 128 - 12:27 PDT - NYC NY - LRAD says there are protesters unlawfully blocking the roadway
Day 128 - Rochester NY - Rochester Mayor Lovely Warren indicted by grand jury, charged with scheme to defraud 
^https://www.rochesterfirst.com/local-politics/monroe-county-district-attorney-to-make-announcement-on-new-york-state-board-of-elections-investigation/
^free them all march in NYC escorted by massive police presence
Day 128 - 6:07 PDT - Kansas City, MO - starts occupying ??????something
Day 128 - N/A - Rochester NY - Protesters drive from city hall to Monroe County District Attorney Sandra Dooley house, tho most of the cars get lost along the way or break off
^https://twitter.com/RisePDX/status/1312253749444841472?s=19
Day 129 - N/A - Portland OR - PPB arrests. Bike cop apparently ran over protestor with a motorcycle. Protestor appears uninjured. Arrest of a mutual aid medic who would not leave the injured. - https://streamable.com/jy4da8 - 
^https://streamable.com/nfuykg
^https://streamable.com/9blh1i
^https://streamable.com/8va4qg
Day 129 - 00:12 PDT - Portland OR - Protestor having some sort of medical emergency. PPB hangs over wall yelling at Mutual Aid and protestors who were protecting the injured.
Day 129 - 00:22 PDT - Portland OR - PPB escort a medic out. Protestors refuse help from medic.
Day 129 - 00:24 PDT - Portland OR - PPB retreats back onto the MCSO property.
Day 129 - N/A - Seattle WA - Joey Wieser (streamer) arrested in Seattle. (unsure of time) - https://streamable.com/gixn70
Day 129 - 01:50 AM PDT - protesters still infront of the MCSO and apparently they arrested the person that was run over. TLDR: It took too long at the hospital, she came back to go to a different hospital, and cops arrested her (Assfault stream on INTL)
Day 129 - 10:18 AM PDT - DC - arrest of BLM protesters at Trump Walk Away rally - https://twitter.com/rawsmedia/status/1312447763854974976
Day 129 - 16:40 PDT - Beverly Hills, CA - Reporter interviews an interesting pro-Trump protester.
Day 129 - 17:00 PDT - Los Angeles, CA; Seattle, WA; Bakersfield, CA; Rochester, NY; Phoenix, AZ - Groups marching in the streets.
Day 129 - N/A - Seattle, WA - Something happening in front of a Goodwill. (unsure why, right now)
^https://twitter.com/IamBday/status/1312545066573938689?s=20
Day 129 - 17:55 PDT - Rochester NY - RPD form riot line in after protesters move both barricades out of the way
Day 129 - 18:01 PDT - Rochester, NY - Water bottle tossed. Police seting up new barricade
Day 129 - 19:00 PDT - Beverly Hills, CA - Pro-Trump and counter protesters argue at each other across the street.
Day 129 - 19:02 PDT - Omaha, NE - Protesters marching downtown, on the sidewalk. Small group.
Day 129 - 19:02 PDT - Rochester, NY - Protesters continue marching in the streets.
Day 129 - 19:05 PDT - Los Angeles, CA - Protester arrested  (Trump supporter, possibly drunk)
Day 129 - 19:30 PDT - Rochester, NY - protesters arrive back at MLK park and disperse
Day 129 - 20:25 PDT - Seattle, WA - Protesters continue marching in the street.
Day 129 - 20:35 PDT - Seattle WA - SPD Bike cops rolling through the street. Appear to be looking for protestors.
Day 129 - 21:03 PDT- Seattle WA - dispersal order after property damage https://twitter.com/SeattlePD/status/1312605042751401985?s=19
Day 129 - 21:08 PDT - Seattle WA - SPD make arrests while continuing to push protestors up the street.
Day 129 - 21:11 PDT - Seattle WA - SPD continuing to push protestors. Fireworks deployed.
Day 129 - 21:11 PDT - Seattle WA -pointing mace at joey
Day 129 - 21:11 PDT - Seattle WA -lrad saying that protesters are participating in criminal mischeif
Day 129 - 21:12 PDT - Seattle WA -amongst the chaos and MOOOOVES and DISPEEEERSE protesters start doing chants and playing on the ukelele and drums again
Day 129 - 21:22 PDT - Seattle WA - SPD continuing to arrest protestors. Firing pepper balls into the crowd.
Day 129 - 21:24 PDT - Seattle WA - Protestors are back at Cal Anderson park. SPD states park is closed.
Day 129 - 21:28 PDT - Seattle WA - SPD sweeping through Cal Anderson park looking to arrest protestors.
Day 129 - 21:30 PDT - Seattle WA - SPD now harassing the houseless in the park and waking them up to leave the park.
Day 129 - 22:15 PDT - Seattle WA - Protestors start marching away from Cal Anderson Park.
Day 129 - 22:40 PDT - Los Angeles CA - Armenian protestors block the 101 near Hollywood. CHP tell them they can leave without arrests.
Day 129 - 22:49 PDT - Los Angeles CA - Traffic starting to open. A few cars are stuck.
Day 129 - 22:54 PDT - Seattle WA - SPD form line near protestors. Protestors chant "move back". SPD leaves the area.
Day 129 - 23:00 PDT - Seattle WA - Protestors marching again.
Day 129 - 23:15 PDT - Seattle WA - SPD Bike Gang makes appearance near protestors.
Day 129 - 23:17 PDT - Seattle WA - Chud makes appearance as well. Leaves shortly after being asked to go. Protestors start to march again.
Day 129 - 23:37 PDT - Los Angeles CA (Hollywood) - Armenian protestors in Hollywood raising awareness of conflict between Armenia and Azerbaijan.
Day 130 - 19:48 PDT - seattle - arrest streamer claims to be illegal
Day 130 - 21:30 PDT- Portland OR - Crowd beginning to gather
Day 130 - 21:50 PDT- Portland OR - Crowd beginning to march
Day 130 - 21:58 PDT- Portland OR - PPB LRAD announces that "vandalism of the courthouse will not be tolerated" and advises the march that they are not allowed in the street.
Day 130 - 22:10 PDT- Portland OR - Crowd gathered in street trying to find courthouse
Day 130 - 22:15 PDT- Portland OR - PPB LRAD repeats announcements
Day 130 - 22:16 PDT - Portland OR - MCSO come out to defend the courthouse.
Day 130 - 22:20 PDT- Portland OR - Crowd chanting at PPB officers
Day 130 - 22:23 PDT - Portland OR - PPB Riot van shows up with several cops. Start pushing protestors down the street.
Day 130 - 22:25 PDT - Portland OR - PPB arrest protestor.
Day 130 - 22:30 PDT- Portland OR - Crowd on opposite corner from PPB playing music and chanting
Day 130 - 22:35 PDT- Portland OR - Crowd moves to march
Day 130 - 22:43 PDT - Portland OR - Protestors arrive at Injustice Center/Federal Courthouse.
Day 130 - 23:00 PDT - Portland OR - Protestors start to march again after holding space near the Injustice center.
Day 130 - 23:00 PDT - Los Angeles CA (Hollywood) - Armenian protestors continue to hold space near the CNN building.
Day 130 - 23:06 PDT - Portland OR - Protestors arrive at Portland City Hall.
Day 130 - 23:15 PDT - Portland OR - PPB vehicles and officers arrive
Day 130 - 23:18 PDT - Portland OR - Protestors practicing as PPB vehicles and officers drive by and get out in front of them
Day 130 - 23:19 PDT - Portland OR - PPB out and start making arrests. PPB stealing personal property from protestors. - https://twitter.com/cdsupriyadi/status/1313002297266380800
Day 130 - 23:06 PDT - Portland OR - twitter post of protestor hit by rubber bullet https://twitter.com/PDocumentarians/status/1312997624631357445
Day 130 - 23:24 PDT - Portland OR - PPB make another arrest.
Day 130 - 23:25 PDT - Portland OR - Several aggressive arrests made
Day 130 - 23:36 PDT - Portland OR - PPB riot squad leave the front of City Hall.
Day 130 - 23:50 PDT - Portland OR - Protest appears to be over, protestors going home
Day 131 - 15:05 PDT - DC - [OFF STREAM] "DC Park police come to home of Mutual Aid organizer. Protesters quickly arrive & ask them to leave." - https://twitter.com/ChuckModi1/status/1313238804384358401
Day 131 - 18:30ish PDT - Wolfe City TX - Fight breaks out at a Jonathan Price memorial vigil with "counter-protestors" there to "stop the looting"
Day 131 - 19:00 PDT - Wolfe City TX - cops say that man who pointed weapon at crowd will face charges after letting him leave but walks away from group after furthering questioning
Day 131 - 19:10 PDT - Vancouver WA - BTB crowd gathered on overpass. Many children present.
Day 131 - 19:10 PDT - NYC NY - Several groups gathered on multiple corners of street with lots of police presence.
Day 131 - 19:40 PDT - NYC, NY - first arrest
Day 131 - 20:30 PDT - Portland OR - Crowd has gathered and is chanting
Day 131 - 21:00 PDT - Portland OR - Protesters begin marching.
Day 131 - 21:10 PDT - NYC NY - Protestors begin marching.
Day 131 - 21:15 PDT - Portland OR - Protestors arrive at the Injustice Center.
Day 131 - 21:30 PDT - Los Angeles (DTLA) CA - Protestors lined up against LAPD in DTLA near LAPD HQ.
Day 131 - 21:30 PDT - Seattle WA - Protestors marching.
Day 131 - 21:37 PDT - NYC NY - NYPD make arrest. Start shoving protestors around.
Day 131 - 21:40 PDT - Seattle WA - SPD Bike Gang roaming with cruisers and riot van close by.
Day 131 - 21:45 PDT - Los Angeles (DTLA) CA - Protestors begin marching.
Day 131 - 21:48 PDT - NYC NY - NYPD LRAD giving warning to leave the road way or face arrest.
Day 131 - 21:51 PDT - Seattle WA - SPD Bike Gang form riot line. Protestors chant "move back".
Day 131 - 21:52 PDT - NYC NY - NYPD make arrest.
Day 131 - 21:53 PDT - Seattle WA - Protestors marching again.
Day 131 - 23:09 PDT - Portland OR - Protestors continuing to march. Making laps around downtown.
Day 131 - 23:10 PDT - Seattle WA - Protestors in Seattle also continue to march.
Day 132 - 00:00 PDT - Portland OR - Protestors still marching. No eyes on PPB.
Day 132 - 21:30 PDT - Eugene, OR - Protesters gather and chant together. Decent size crowd tonight.
Day 132 - 21:40 PDT - Eugene, OR - Crowd stopped to gather at intersection.
Day 132 - 21:45 PDT - Eugene, OR - crowd moving again
Day 132 - 21:55 PDT - Portland, OR - Crowd has also been marching, just stopped at ICE.
Day 132 - 22:42 PDT - Portland, OR - Crowd outside ICE building still chanting, listening to music as almost 40 minutes pass the 'two minute warning' given earlier. 
^https://twitter.com/hungrybowtie/status/1313715680273809408
Day 132 - 22:51 PDT - Portland, OR - Protester throws a smoke bomb onto the roof of the ICE building.
^https://twitter.com/1misanthrophile/status/1313718373163831297
Day 132 - 22:55 PDT - Portland, OR - Cop lines come out and start to push protestors out with tear gas.
Day 132 - 22:58 PDT - Portland, OR - Gas finally disperses.
Day 132 - 23:01 PDT - Portland, OR - More smoke deployed. Grey colored and green colored.
Day 132 - 23:30 PDT - Portland, OR - Elder Vietnam vet resident taken away by ambulance due to police/ice/dhs shooting tear gas entering their home and they have respiratory issues.
Day 133 - 00:08 PDT - Portland OR - LRAD Disperse warning/ 2 arrests
Day 133 - 00:010 PDT - Portland OR - LRAD Disperse warnings/3rd arrest
Day 133 - 00:13 PDT - Portland OR -trumpet man arrest
Day 133 - 00:14 PDT - Portland OR - no$hu arrest
Day 133 - 00:17 PDT - Portland OR - 3 officers bull rush and steal music bloc speaker
Day 133 - 01:20 PDT - Portland OR - Woke Day 132 to Day 133 Stream Ends.
Day 133 - 14:00 PDT - Milwaukee, WI - Large group forming outside the Public Safety Building where the family of Alvin Cole and the DA have been meeting. The decision of the case is anticipated to be announced some time this afternoon. 
^https://twitter.com/MaryJoOlaTV/status/1313948398509346817?s=20
^https://twitter.com/MKEDefenders/status/1313950954719457280?s=20
DAY 133 - 15:00 PDT - Milwaukee WI - Milwaukee County DA will not charge Wauwatosa Police Officer Joseph Mensah in the death of Alvin Cole. - https://twitter.com/WUWMradio/status/1313962142673100801
DAY 133 - 15:40 PDT - Milwaukee WI - protesters marching onto the freeway after ignoring a 4-car cop line https://twitter.com/elliothughes12/status/1313971788498505729
DAY 133 - 15:42 PDT - Milwaukee WI - arrest? Riot cops run behind the march onto the freewy
DAY 133 - 15:46 PDT - Milwaukee WI - Cops declare unlawful assembly, but out of reach for the protesters to hear
DAY 133 - 15:55 PDT - Milwaukee WI - protesters avoid confrontation by moving off the freeway at the next ramp. cops have badge numbers and names covered up
DAY 133 - 16:11 PDT - Milwaukee WI - protesters now marching through residential area, followed by a caravan of support cars
^https://twitter.com/BGOnTheScene/status/1313988667698900992
DAY 133 - 16:30 PDT - Salt Lake City, UT - (Pics - Protests gathered all around the city as the Vice Presidential Debate is held later this evening. https://twitter.com/EnriqueLimon/status/1313980420795498496?s=20
DAY 133 - 16:30 PDT - Milwaukee WI - (Video - Aerial footage of protesters marching alongside vehicles)
^https://twitter.com/ABC/status/1313985487317667840?s=20
DAY 133 - 16:45 PDT - Milwaukee WI - Protesters marched to 35th and North, well over two miles now.
^https://twitter.com/compujeramey/status/1313988828403847175
DAY 133 - 17:20 PDT - Minneapolis, MN - Protesters still gathered in the streets after Derek Chauvin's release from jail earlier today. https://twitter.com/UR_Ninja/status/1313997843288543237?s=20
DAY 133 - 17:25 PDT - Milwaukee WI - Protesters still marching in the streets alongside vehicles.
DAY 133 - 17:25 PDT - Chicago, IL - Protesters continue marching in the streets.
DAY 133 - 17:25 PDT - Los Angeles, CA - Group of about 70 protests gathered near the US DOS in support of Armenia.
^https://twitter.com/rise_images/status/1313989391275094016?s=20
DAY 133 - 17:30 PDT - Milwaukee, WI - Protesters now at 50th & Center, nearing Wauwatosa, where a  curfew is in effect.
^https://twitter.com/compujeramey/status/1314000522811236353?s=20
DAY 133 - 17:50 PDT - Salt Lake City, UT - Counter Protestors arguing with Protestors
DAY 133 - 17:55 PDT - Salt Lake City, UT - Police arrive to separate groups
DAY 133 - 18:42 PDT - Milwaukee, WI - march has reached cop line
DAY 133 - 18:45 PDT - Milwaukee, WI - LRAD announces "disperse and go home". Unlawful assembly declared
^https://twitter.com/compujeramey/status/1314018374121328640
^https://twitter.com/elliothughes12/status/1314016929426833408
DAY 133 - 18:45 PDT -Salt Lake City, UT - Protesters move back toward the University.
^https://twitter.com/MaxGeopolitics/status/1314018686886264833
DAY 133 - 18:45 PDT - Milwaukee, WI - Bearcat with siren following protesters
DAY 133 - 18:54 PDT - Salt Lake City, UT -  Arrest made (unclear what for)
DAY 133 - 19:16 PDT - Milwaukee, WI - teargas and pepperballs deployed
^https://twitter.com/RicoReporting/status/1314027504089341952?s=19
DAY 133 - 19:18 PDT - Milwaukee, WI (Tosa) - Protesters retreating. Gas continues to flow.
^https://twitter.com/compujeramey/status/1314027544543465474?s=20
DAY 133 - 19:30 PDT - Salt Lake City, UT - Heavy crowd still gathered mostly trump supporters and PBs.
^https://twitter.com/realblairnelson/status/1314041687442944001?s=19
^https://twitter.com/BGOnTheScene/status/1314029860222885890?s=09 + https://twitter.com/BGOnTheScene/status/1314044361005555712?s=09
^https://twitter.com/compujeramey/status/1314032774819581953?s=19
^https://twitter.com/tmj4/status/1314035157863739392?s=19
^https://twitter.com/realblairnelson/status/1314037126120509441?s=19
^https://twitter.com/BGOnTheScene/status/1314040372193038337?s=19 someone brandishes gun
DAY 133 - 20:29 PDT - Minneapolis, MN - Officers moving up police line. LRAD heard saying 'leave the area'.
DAY 133 - 20:30 PDT - Minneapolis, MN - State officers announce themselves on the LRAD. Again demand protesters to 'leave the area'. Unlawful assembly declared.
DAY 133 - 20:35 PDT - Minneapolis, MN - LRAD alarmed. State patrol announces protesters are violating the unlawful assembly order.
DAY 133 - 20:36 PDT - Minneapolis, MN - Officers slowly move up their line to push protesters back.
DAY 133 - 20:37 PDT - Minneapolis, MN - "You are all now under arrest" "Take a seat on the pavement now". Officers continue to push forward. Tell streamers/press to move out of the way or they will be arrested.
^https://twitter.com/ShelbyTalcott/status/1314057323082584064?s=19
DAY 133 - 20:38 PDT - Minneapolis, MN - Police vehicles begin to move in. Officers continue to shout that everyone is under arrest and order all people to get on the ground. Including press.
DAY 133 - 20:42 PDT - Milwaukee, WI - the peaceful group in Tosa encounters another police line, cops line reaches onto people's front lawns
DAY 133 - 20:43 PDT - Milwaukee, WI - Protesters kettled, Strange negotiation with trapped community leaders
DAY 133 - 20:46 PDT - Milwaukee, WI - Community outreach folk allowed to leave in MN, marked press allowed to leave
DAY 133 - 20:46 PDT - Milwaukee, WI - Unicorn riot (press) being told to sit down in MN, but eventually let go
DAY 133 - 20:47 PDT - Milwaukee, WI - teargas on peaceful group in tosa, still in the residential area
^https://twitter.com/BGOnTheScene/status/1314067726680444928
DAY 133 - 20:54 PDT - Wawautosa, WI - Cops chase protesters, still while in the residential neighborhood.
^https://twitter.com/KittyLists/status/1314051294944923649?s=20 
DAY 133 - 20:55 PDT - Wawautosa, WI - "Black Lives Matter" tagged onto a U.S. Bank.
^https://twitter.com/BGOnTheScene/status/1314051777336168457?s=20
Day 133 - 21:23 PDT - Minneapolis MN - More arrests. Appears to be ambushing.
Day 133 - 21:23 PDT - Minneapolis MN - Car was trying to leave and go home. Cops stopped the vehicle and pull everyone out of the car.
Day 133 - 21:24 PDT - Minneapolis MN - Police detain NLG members.
DAY 133 - 21:27 PDT - Portland, OR - Protesters gather in the street and listen to speaker.
DAY 133 - 23:20 PDT - Seattle, WA - BLM protesters marching towards Broadway
DAY 134 - 16:00 PDT - St. Paul, MN - "Secret March: Derek Chauvin must be locked up": A highly-organized protest/demonstration is taking place.
^Pics: https://twitter.com/WomensMarchMN/status/1314337527155822593?s=20
^More pics: "Hundreds have gathered in St. Paul, including many families who've had their loved ones killed by Minnesota police, for a funeral/demonstration."https://twitter.com/UR_Ninja/status/1314337826104897536?s=20
^Vid: Protesters are holding signs in the form of tombstones with the names of people who have lost their lives to police violence or during incarceration.https://twitter.com/bymyelf/status/1314341194286202880?s=20
^"Secret March: Derek Chauvin must be locked up"
^Protesters march in the street. Some are also carrying caskets and body bags, symbolizing those that have been lost.
^Pics: https://twitter.com/CrimeWatchMpls/status/1314343598385696771?s=20
^https://twitter.com/millcitycitizen/status/1314346865807294465?s=20
DAY 134 - 16:24 PDT - Minneapolis MN - Protesters gather at capitol. Indigenous people drumming and dancing.
`;

let object = {}; // root object
let lastObject = null; // last object for ^ that "attach" to the previous root timestamp

data.split("\n").map(string => {
  if(!/^\^/g.test(string)) {
    let pieces = string.split('-'); // split chat lines into pieces
    const day = pieces[0].toLowerCase(); 
    const time = pieces[1];
    const location = (pieces[3] === undefined) ? null : pieces[2]; // if no location is provided this *should* catch it and set it to null
    // if no location is defined we grab the text that is instead stored inside of index >=2
    const body = (location === null) ? pieces[2] + pieces.slice(2).join() : pieces[3] + pieces.slice(3).join(); // rest of the text needs to be combined, if it contains any extra dashes
    const attachments = [];
    let insert = {day, time, location, body, attachments}

    const buffer = Buffer.from(day, "utf8"); // create buffer
    const key = buffer.toString("base64"); // generate base64 encode of the day for an ID

    if(!object[key]) { // object with key hasn't been created yet
      object[key] = {events: [insert]}; // insert our data into the new object with generated key
    } else {
      object[key]['events'].push(insert); // object with day key exists, push to it
    }

    lastObject = object[key]['events'][object[key]['events'].length - 1]; // set the last object to the previously added timestamp
  } else if(/^\^/g.test(string)) {
    lastObject.attachments.push(string.replace('^', '')); // if a ^ is detected, append the content to the "attachments" of the previous timestamp
  }
});

// write our JSON outpt to a JSON file
fs.writeFile('timeline.json', JSON.stringify(object), (err) => {
  if(err) throw err;
});