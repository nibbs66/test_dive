import React from 'react';
import AccordionLayout from "../../Accordion/AccordionLayout";


const Faq = ({activeIndex, setActiveIndex}) => {
    return (
        <>
            <AccordionLayout
                title={'Wat komt erbij kijken on te leren duiken?'}
                bg={`${activeIndex === 1 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={1}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
              <div className={`mx-4 text-xs md:text-sm lg:text-base text-slate-500`}>
                  <p>
                      Leren duiken met RnG DIVING en PADI is een ongelooflijk avontuur! Met PADI als uw
                      trainingsorganisatie, wordt uw pad naar ademhalen onder water bereikt in drie spannende
                      fasen:
                  </p>
                  <span>
                          1. <b> Kennisontwikkeling - Leer het jargon</b>
                    </span>

                  <p>
                      Tijdens de eerste fase van je PADI Open Water Diver-duikbrevet, ontwikkel je een goed begrip
                      van de basisprincipes van het duiken. Je leert dingen zoals hoe druk je lichaam beïnvloedt,
                      hoe je de beste duikuitrusting kiest en waar je rekening mee moet houden bij het plannen van
                      duiken. Je bespreekt kort wat je hebt bestudeerd in de vijf kennisafdelingen met je
                      instructeur en maakt een korte quiz om er zeker van te zijn dat je het krijgt.

                      Aan het einde van de cursus, doe je een langere quiz die ervoor zorgt dat je alle
                      belangrijke concepten en ideeën laag houdt. Jij en je RnG DUIK Instructeur zullen alles
                      bekijken wat je niet helemaal begrijpt tot het duidelijk is.<br/>

                      Selecteer de kennisontwikkelingsoptie die u verkiest:
                  </p>
                  <ul>
                      <li>
                          Begin nu en leer online duiken met RnG DIVING via PADI eLearning in je eigen tempo - altijd
                          en overal (ideaal voor drukke schema&apos;s)
                      </li>
                      <li>
                          Woon een geplande duikcursus bij RnG DIVING bij (ideaal voor het ontmoeten van nieuwe
                          vrienden en duikmaatjes)
                      </li>
                      <li>
                          Maak gebruik van thuis studie met behulp van PADI-multimediamateriaal (handleiding, video,
                          cd-rom) gekocht via RnG DIVING.
                      </li>
                  </ul>

                  <span>
                         2. <b>Confined Water Dives (zwembadlessen) - Duikvaardigheden Training.</b>
                    </span>
                  <p>
                      Daar gaat het allemaal om - duiken. Je ontwikkelt basisduikvaardigheden door te duiken in
                      een zwembad of watermassa met zwembadachtige omstandigheden. Hier leert u alles, van het
                      opzetten van uw duikuitrusting tot het eenvoudig weggooien van water uit uw duikmasker
                      zonder te duiken. Je zult ook een aantal noodvaardigheden oefenen, zoals lucht delen of je
                      duikmasker vervangen. Bovendien kun je een aantal games spelen, nieuwe vrienden maken en een
                      geweldige tijd hebben. Er zijn vijf duiken met beperkt water, met elk gebouw op de vorige.
                      In de loop van deze vijf duiken, bereik je de vaardigheden die je nodig hebt om in open
                      water te duiken.
                  </p>
                  <span>
                         3. <b>Open waterduiken - lokaal of op vakantie.</b>
                    </span>
                  <p>
                      Na je besloten duiken duiken jij en de nieuwe vrienden die je hebt gemaakt door tijdens vier
                      open water duiken met je RNG DIVING PADI-instructeur op een duikstek. Hier beleef je het
                      onderwateravontuur volledig - op het beginnersniveau natuurlijk. Je mag deze duiken maken
                      rond Adelaide of op een meer exotische bestemming tijdens een RNG DIVING groepsreis.
                  </p>
              </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Hoe lang duurt het om gecertificeerd te worden?'}
                bg={`${activeIndex === 2 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={2}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                    <p>
                        Het is mogelijk om je beperkte en open water duiken in slechts twee of drie dagen te voltooien
                        door het klaslokaal gedeelte online te voltooien via PADI eLearning of home study-opties aangeboden door RnG DIVING.

                        De PADI Open Water Diver-cursus is ongelofelijk flexibel en op prestaties gebaseerd, wat betekent
                        dat RnG DIVING een breed scala aan schema&apos;s kan bieden, afgestemd op hoe snel je vooruitgang boekt.

                        De interesse van je instructeur is dat je leert duiken, niet in hoelang je in een klas zit.
                        Training is dus gebaseerd op het aantonen dat je weet wat je moet weten en kunt doen wat je moet doen.
                        Dit betekent dat je in je eigen tempo vooruitgaat - sneller of langzamer, afhankelijk
                        van de tijd die je nodig hebt om een zelfverzekerde duiker te worden die regelmatig duikt. Je kunt nu beginnen
                        met online leren duiken met RnG DIVING en PADI eLearning.
                    </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={' Hoeveel kost het om duikles te nemen?'}
                bg={`${activeIndex === 3 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={3}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
               <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                   <p>
                       Vergeleken met andere populaire avontuurlijke sporten en buitenactiviteiten, is het leren van duiken niet duur.

                       U kunt bijvoorbeeld verwachten ongeveer hetzelfde te betalen als voor:
                   </p>
                   <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                       <li>
                           -een hele dag surflessen
                       </li>
                       <li>
                           -een weekend rotsklimlessen
                       </li>
                       <li>
                           -een weekend met kajaklessen
                       </li>
                       <li>
                           -een weekend vol vliegvissen
                       </li>
                       <li>
                           -ongeveer drie uur privé golflessen
                       </li>
                       <li>
                           -ongeveer drie uur privéles voor waterskiën
                       </li>
                       <li>
                           -een geweldige avond uit in de pub!
                       </li>
                   </ul>
                   <p>
                       Leren duiken is een grote waarde als je bedenkt dat je leert duiken onder begeleiding en aandacht van een goed opgeleide, ervaren professional - je RnG DIVING PADI duikinstructeur. Vanaf de eerste dag begint het duiken met het transformeren van je leven met nieuwe ervaringen die je deelt met vrienden. En je kunt het bijna overal doen waar water is. Begin met online leren met RnG DIVING en bereid je voor op je eerste adem onder water!

                       RnG DIVING is er trots op om de PADI Open Water Course vanaf € 439,00 per persoon te kunnen aanbieden.
                   </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Welke duikuitrusting heb ik nodig om te leren duiken?'}
                bg={`${activeIndex === 4 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={4}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Het kiezen en gebruiken van je duikuitrusting is onderdeel van het plezier van duiken.
                         RnG DIVING helpt je de juiste versnelling te vinden. Elk stuk duikuitrusting heeft een
                         andere functie, zodat het zich collectief aanpast aan de onderwaterwereld.
                         Als je begint te leren duiken, moet je het tenminste willen:
                     </p>


                     <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                         <li>duikmasker</li>
                         <li>snorkel</li>
                         <li>laarzen</li>
                         <li>duikvinnen</li>
                     </ul>
                     <p>
                         Deze hebben een persoonlijke pasvorm en RnG DIVING helpt u bij het kiezen van degene
                         die de pasvorm en functies hebben die het best bij u passen. Inbegrepen in de kosten
                         van uw PADI Open Water Diver-cursus, biedt RnG DIVING een:
                     </p>
                     <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                         <li>duikregelaar</li>
                         <li>duiken BC</li>
                         <li>duikcomputer</li>
                         <li>duikfles</li>
                         <li>duikpak</li>
                         <li>gewichtsysteem en gewichten</li>
                     </ul>
                     <p>
                         Controleer met RnG DIVING om de maatverdeling voor uw cursuspakket te bevestigen.
                         Het wordt aanbevolen dat u in uw eigen duikuitrusting investeert wanneer u aan uw
                         cursus begint, omdat:
                     </p>
                     <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                         <li>je bent meer comfortabel met het gebruik van duikuitrusting die voor jou is uitgerust</li>
                         <li>je bent meer comfortabel om te leren duiken met behulp van de uitrusting die je hebt gekozen</li>
                         <li>duikers die hun eigen duikuitrusting bezitten, vinden het handiger om te gaan duiken</li>
                         <li>het hebben van je eigen duikuitrusting maakt deel uit van het plezier van duiken</li>
                     </ul>
                     <p>
                         Het soort uitrusting dat je nodig hebt, hangt af van de omstandigheden waarin je duikt. Je wilt misschien:
                     </p>
                     <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                         <li>tropische duikuitrusting</li>
                         <li>gematigde duikuitrusting</li>
                         <li>koud water duikuitrusting</li>
                     </ul>

                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Hoe weet ik wat de beste duikuitrusting is?'}
                bg={`${activeIndex === 5 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={5}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                    <p>
                        Gemakkelijk. Er is geen beste uitrusting. Maar er is de beste uitrusting voor jou.
                        De professionals van RnG DIVING zijn opgeleid om u te helpen bij het vinden van
                        duikuitrusting die het beste past bij uw voorkeuren, pasvorm en budget. Deze professionals
                        kunnen je helpen bij het instellen van de juiste dingen, plus ze bieden service en
                        ondersteuning voor jarenlang plezierig en betrouwbaar gebruik.

                        U kunt ook met andere duikers in de online duikgemeenschap van PADI praten om
                        aanbevelingen te krijgen over bepaalde merken en modellen duikeruitrusting.
                    </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Wat is er nodig om duiklessen te nemen?'}
                bg={`${activeIndex === 6 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={6}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                    <p>
                        Als je zin hebt in spanning en avontuur, is de kans groot dat je een
                        fervent PADI-duiker wordt. U moet ook rekening houden met deze vereisten:<br/>
                        Minimum leeftijd:
                    </p>

                    <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                        <li>12 jaar oud</li>
                    </ul>
                    <p>
                        Studenten jonger dan 15 jaar die de cursus met succes voltooien, komen in
                        aanmerking voor de PADI Junior Open Water Diver-certificering, die ze kunnen
                        upgraden naar PADI Open Water Diver-certificering na het bereiken van 15. Je moet
                        ten minste 13 jaar oud zijn om online duikles te nemen met PADI eLearning,
                        vanwege internationale internetwetgeving. Als je jonger bent, kun je nog steeds
                        leren duiken - laat je ouder of wettelijke voogd contact opnemen met RNG DUVING.
                    </p>
                    <p>
                        <b>Fysiek</b>: voor de veiligheid vullen alle studenten een korte medische vragenlijst
                        in die vraagt naar medische aandoeningen die een probleem kunnen vormen tijdens het duiken.
                        Als geen van deze van toepassing is, ondertekent u het formulier en kunt u beginnen. Als
                        een van deze situaties op u van toepassing is, moet uw duikarts (SPUMS) als veiligheidsmaatregel
                        de toestand beoordelen in verband met duiken en een medisch formulier ondertekenen dat bevestigt
                        dat u geschikt bent om te duiken. In sommige gebieden vereisen lokale wetten dat alle duikstudenten
                        een arts raadplegen voordat ze aan de cursus beginnen.
                    </p>
                    <p>
                        <b>Waterskills</b>: voordat je de PADI Open Water Diver-cursus voltooit, laat je instructeur je
                        het basiswaterkill-comfort demonstreren door:

                        zwem 200 meter /  (of 300 meter / met masker, vinnen en snorkel). Er is hiervoor geen tijdslimiet
                        en u mag elke gewenste zwemslag gebruiken.
                        zweef en loop water gedurende 10 minuten, opnieuw met elke gewenste methode.
                        Over fysieke uitdagingen: elke persoon die aan de prestatie-eisen van de cursus kan voldoen,
                        komt in aanmerking voor certificering. Er zijn veel adaptieve technieken waarmee personen met
                        fysieke uitdagingen aan deze vereisten kunnen voldoen. Mensen met een dwarslaesie, amputaties en
                        andere uitdagingen verdienen gewoonlijk de PADI Open Water Diver-certificering. Zelfs mensen
                        met meer significante fysieke uitdagingen nemen deel aan het duiken. Praat met je PADI-instructeur
                        in je lokale PADI-duikwinkel of -resort voor meer informatie.
                    </p>
                    <p>
                        <b>Leermateriaal</b>: Tenzij je kiest voor PADI eLearning, moet je het volgende trainingsmateriaal
                        gebruiken en gebruiken tijdens de PADI Open Water Diver-cursus en voor je beoordeling en referentie
                        na de cursus:
                    </p>
                    <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                        <li>De PADI Open Water Diver-handleiding</li>
                        <li>PADI Open Water Diver Video op DVD of de PADI Open Water Diver Multimedia (combineert
                            handleidingen en video voor computergebaseerd leren).</li>
                        <li>Je hebt ook je PADI-logboek en Recreational Dive Planner nodig</li>
                    </ul>

                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Waar kan ik duiken?'}
                bg={`${activeIndex === 7 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={7}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Je kunt praktisch overal duiken, van water - van een zwembad naar de oceaan en alle punten
                         daartussenin, inclusief steengroeven, meren, rivieren en bronnen. Waar u kunt duiken, wordt
                         bepaald door uw:
                     </p>
                     <ul className={`flex flex-col  gap-1 font-bold my-1`}>
                         <li>ervaring</li>
                         <li>niveau site</li>
                         <li>toegankelijkheid</li>
                         <li>voorwaarden belangen</li>
                     </ul>

                     <p>
                         Als je bijvoorbeeld net je PADI Open Water Diver-cursus hebt afgerond, duik je waarschijnlijk
                         niet onder het Antarctische ijs tijdens je volgende duik. Maar beperk je denken niet tot het
                         warme, heldere water dat je ziet in reismagazines. Sommige van de beste duiken zijn dichterbij
                         dan je denkt.

                         Je lokale duiklocatie kan van alles zijn, van een speciaal zwembad dat speciaal is gebouwd voor
                         duikers zoals een zwembad in Brussel, of meer typisch natuurlijke sites zoals het Great Blue Hole
                         in Belize, het Great Barrier Reef in Australië of het Yonaguni-monument in Japan. Het kan een
                         door de mens gemaakt reservoir zijn of een rivier vol met fossielen. Het gaat niet altijd om
                         grote zichtbaarheid, want wat je ziet is belangrijker dan hoe ver je ziet.

                         Het enige echte belangrijke ding over waar je duikt is dat je de duikopleiding en -ervaring
                         hebt die geschikt is om daar te duiken, en dat je een duikbuddy bij je hebt. RnG DIVING kan
                         u helpen bij het organiseren van geweldige lokale duiken of een duikvakantie. Bezoek vandaag om
                         aan de slag te gaan.
                     </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Mijn oren doen pijn als ik naar beneden duik. Zal dat me ervan weerhouden een duiker te worden?'}
                bg={`${activeIndex === 8 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xxs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={8}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Nee, ervan uitgaande dat je geen onregelmatigheden in je oren en sinussen hebt. Het ongemak is
                         het normale effect van waterdruk op je oren. Gelukkig zijn onze lichamen ontworpen om zich aan
                         te passen aan drukveranderingen in onze oren - je hoeft alleen maar te leren hoe. Als je tijdens
                         het vliegen geen problemen hebt om je aan de luchtdruk aan te passen, zul je waarschijnlijk geen
                         problemen ondervinden tijdens het duiken om aan de waterdruk aan te passen.
                     </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Betekent een geschiedenis van oorproblemen, diabetes, astma, allergieën of roken dat iemand niet kan duiken?'}
                bg={`${activeIndex === 9 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xxs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={9}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Niet noodzakelijk. Elke aandoening die de oren, sinussen, ademhalingsfunctie of hartfunctie
                         beïnvloedt of het bewustzijn kan veranderen, is een zorg, maar alleen een arts kan het individuele
                         risico van een persoon beoordelen. Artsen kunnen zo nodig het Divers Alert Network (DAN) raadplegen
                         bij het beoordelen van een scuba-kandidaat.

                         DAN heeft online informatie beschikbaar als u wat onderzoek wilt doen.
                     </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Wat zijn de meest voorkomende verwondingen of ziekten geassocieerd met duiken?'}
                bg={`${activeIndex === 10 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xxs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={10}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Zonnebrand en zeeziekte, die beide voorkomen kunnen worden met vrij verkrijgbare middelen.
                         De meest voorkomende verwondingen veroorzaakt door het leven in zee zijn schrammen en steken,
                         waarvan de meeste kunnen worden vermeden door het dragen van handschoenen en een belichtingspak,
                         blijven van de bodem en kijken waar u uw handen en voeten zet.

                         Neem contact op met RnG DIVING voor informatie over de bescherming van de blootstelling die nodig is voor al uw duiken.
                     </p>
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={'Hoe zit het met haaien?'}
                bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={11}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Als je geluk hebt, krijg je een haai te zien. Vraag om de diverse trip waar je haaien kunt tegenkomen!

                         Hoewel incidenten met haaien voorkomen, zijn ze zeer, zeer zeldzaam. De meest voorkomende ontmoetingen
                         met haaien hebben voornamelijk betrekking op speervissen of voederen van haaien, die beide leiden tot
                         erotisch voedingsgedrag. Haaien belangrijkste voedselbron is vis en als ze een gratis feed krijgen kunnen ze.

                         Meestal, als je een haai ziet, passeert het en is het een relatief zeldzaam schouwspel om van te genieten.

                         Sommige mythen, over haaien, die je hebt gehoord, kunnen worden weggenomen door Australian Geographic te controleren.
                     </p>
                </div>
            </AccordionLayout><AccordionLayout
            title={'Hebben vrouwen speciale zorgen bij of tijdens het duiken?'}
            bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
            text={'text-white'}
            titleSize={`text-xs md:text-base`}
            mx={'mx-10'}
            width={`w-full`}
            bodyMargin={'mx-10'}
            index={12}
            body={`justify-center`}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
        >
            <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                <p>
                    Afgezien van zwangerschap, nee. Omdat fysiologen weinig weten over de effecten van duiken op de
                    foetus, is de aanbeveling dat vrouwen duiken vermijden tijdens de zwangerschap of proberen zwanger
                    te worden. Menstruatie is normaal geen zorg.


                </p>
                </div>
        </AccordionLayout>
            <AccordionLayout
            title={'Hoe diep ga je?'}
            bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
            text={'text-white'}
            titleSize={`text-xs md:text-base`}
            mx={'mx-10'}
            width={`w-full`}
            bodyMargin={'mx-10'}
            index={13}
            body={`justify-center`}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
        >
             <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                 <p>
                     Met de nodige training en ervaring is de limiet voor recreatief duiken 40 meter. Beginnende duikers
                     blijven ondieper dan ongeveer 18 meter, tenzij je een Junior Scuba Diver bent, dan is het 12 meter.
                     Hoewel dit de limieten zijn, is een aantal van de meest populaire duiken niet dieper dan
                     12 meter / 40 voet waar het water warmer is en de kleuren helderder.
                 </p>
                </div>
        </AccordionLayout>
            <AccordionLayout
            title={'Wat gebeurt er als ik al mijn lucht opgebruik?'}
            bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
            text={'text-white'}
            titleSize={`text-xs md:text-base`}
            mx={'mx-10'}
            width={`w-full`}
            bodyMargin={'mx-10'}
            index={14}
            body={`justify-center`}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
        >
             <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                 <p>
                     Dat is niet waarschijnlijk, omdat je een meter hebt die je vertelt hoeveel lucht je te allen
                     tijde hebt. Op deze manier kunt u terugkeren naar de oppervlakte met nog een veiligheidsreserve
                     over. Maar om de vraag te beantwoorden, als uw lucht opraakt, heeft uw buddy een reserve mondstuk
                     waarmee u een enkele luchttoevoer kunt delen tijdens het zwemmen naar de oppervlakte. Er zijn ook
                     andere opties die je leert in je PADI Open Water-cursus bij RnG DIVING.
                 </p>
                </div>
        </AccordionLayout>
            <AccordionLayout
                title={'Wat als ik me claustrofobisch voel?'}
                bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                text={'text-white'}
                titleSize={`text-xs md:text-base`}
                mx={'mx-10'}
                width={`w-full`}
                bodyMargin={'mx-10'}
                index={15}
                body={`justify-center`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                 <div className={`mx-4 text-xs md:text-sm lg:text-base  text-slate-500`}>
                     <p>
                         Mensen vinden de &quot;gewichtloosheid&quot; van het duiken behoorlijk vrij. Moderne duikmaskers zijn
                         verkrijgbaar in doorschijnende modellen, die je misschien liever hebt als een masker je een afgesloten
                         gevoel geeft. Tijdens je duikopleiding met RnG DIVING, geeft je instructeur je voldoende tijd en
                         coaching om vertrouwd te raken met elke leerfase. Je duikinstructeur werkt in je eigen tempo met
                         je mee om ervoor te zorgen dat je elke vaardigheid onder de knie hebt die nodig is om een capabele
                         duiker te worden die regelmatig duikt.
                     </p>
                     <p>
                         <b>
                             RnG DIVING houdt klassen klein, zodat we u meer tijd kunnen geven om vertrouwd te raken met
                             de verbazingwekkende duikwereld.
                         </b>
                     </p>
                </div>
            </AccordionLayout>




        </>
    );
};

export default Faq;
