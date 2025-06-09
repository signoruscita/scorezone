import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/8bit/accordion";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/8bit/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/8bit/radio-group";
import Risultato from "./risultato-card";

export default function ScorezonePage() {
  return (
    <div className="flex flex-col p-4 gap-5 pt-10">
      <h1 className={`${"retro"} md:text-2xl font-bold`}>Pagina</h1>
      <ScorezoneComps></ScorezoneComps>
    </div>
  );
}

function ScorezoneComps() {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="col-span-1">
      <div className="flex flex-col">
        <Accordion type="multiple">
          <AccordionItem value="acoordion-item-sfide">
            <AccordionTrigger>
              <h2 className={`${"retro"} text-xs font-bold`}>
                Sfide
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              {Array.from({ length: 252 }).map((_, i) => (
                <Button variant="secondary" key={"sssssssssss-" + i}>
                  {i + 1}
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="acoordion-item-ricerca">
            <AccordionTrigger>
              <h2 className={`${"retro"} text-xs font-bold`}>
                Ricerca Testo
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              {/* ricerca  testo */}
              <Card className="gap-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ricerca per Testo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-4">
                      <Label htmlFor="name" className="sr-only">
                        Name
                      </Label>
                      <Input
                        id="uiel-search"
                        type="text"
                        className="w-full"
                        placeholder="titoli, date, giocatori, ovunque..."
                      />
                      <Button type="submit" className="w-full">
                        Cerca
                      </Button>
                      <Button type="reset" variant="outline">
                        Reset
                      </Button>
                    </div>
                    {/* <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div> */}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="acoordion-item-anno">
            <AccordionTrigger>
              <h2 className={`${"retro"} text-xs font-bold`}>
                Filtra Anno
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              {/* ricerca  anno */}
              <Card className="gap-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 gap-0">
                  <CardTitle className="text-sm font-medium">
                    Filtra per Anno
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <RadioGroup defaultValue="tutti">
                      {[
                        ["tutti", "", true],
                        ["2025", "22"],
                        ["2024", "52"],
                        ["2023", "53"],
                        ["2022", "46"],
                        ["2021", "60"],
                        ["2020", "19"],
                      ].map(([year, num, selected], iindex) => (
                        <div
                          className="flex items-center space-x-2"
                          key={"yearfilter-" + iindex + "-" + year}
                        >
                          <Label>
                            <RadioGroupItem value={num.toString()} />
                            {year} {num ? "(" + num + ")" : ""}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    <div className="col-span-1 md:col-span-2 ">
      <div className="flex flex-col gap-4 md:col-span-4">
        <h2 className={`${"retro"} text-xl font-bold`}>Risultati</h2>
        {Array.from({ length: 20 }).map((_, i) => renderRisultato(i, getSampleData(i + 1)))}
      </div>
    </div>
  </div>
}

function renderRisultato(i: number, data: any): any {
  return <div key={'romerand-' + i}>
    <Risultato key={'romerand2-' + i} data={data}></Risultato>
  </div>
};

function getSampleData(id = 1) {
  return {
    "id": id,
    "sfidaid": id,
    "data": "2025-06-01T22:00:00.000Z",
    "titolo": "Some title for the scorezone " + id,
    "regole": null,
    "romset": "romset_name_" + id,
    "pos_01_pts": 477600,
    "pos_01_name": "Linobob",
    "pos_02_pts": 286500,
    "pos_02_name": "Ant0n1o",
    "pos_03_pts": 229200,
    "pos_03_name": "Kalalu",
    "pos_04_pts": 184300,
    "pos_04_name": "Boh!",
    "pos_05_pts": 150700,
    "pos_05_name": "Prestissimo",
    "pos_06_pts": 134800,
    "pos_06_name": "Andrew",
    "pos_07_pts": 119350,
    "pos_07_name": "KingOfSka",
    "pos_08_pts": 59600,
    "pos_08_name": "SignorUscita",
    "pos_09_pts": 0,
    "pos_09_name": null,
    "pos_10_pts": 0,
    "pos_10_name": null,
    "pos_11_pts": 0,
    "pos_11_name": null,
    "pos_12_pts": 0,
    "pos_12_name": null,
    "pos_13_pts": 0,
    "pos_13_name": null,
    "pos_14_pts": 0,
    "pos_14_name": null,
    "pos_15_pts": 0,
    "pos_15_name": null,
    "img_0": `https://scorez.one/assets/webp/${id}-title.webp`,
    "img_1": `https://scorez.one/assets/webp/${id}-screen.webp`,
  };
}
