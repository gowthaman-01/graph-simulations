import { AVERAGE_SPEED, GRAPH_POSITION } from '../common/constants';
import {
    AlgorithmType,
    HeuristicType,
    GraphDiv,
    GraphStructure,
    GraphType,
    SimulationSpeed,
    Node,
    WeightType,
    Dropdowns,
} from '../common/types';
import RunResults from './RunResults';
import { createBasicGridGraph, generateStartAndEndNode } from './graph';

/**
 * Singleton class to manage global variables used in the application.
 */
class GlobalVariablesManager {
    private static instance: GlobalVariablesManager;
    private graph: GraphStructure;
    private gridSize: number;
    private runResults: RunResults[];
    private startNode: number;
    private endNode: number;
    private graphType: GraphType;
    private weightType: WeightType;
    private stepIncrement: number;
    private endNodeReachable: boolean;
    private containsNegativeWeightCycle: boolean;
    private heuristicType: HeuristicType;
    private simulationSpeed: SimulationSpeed;
    private tutorialPageNumber: number;
    private showTutorial: boolean;
    private leftGraphDiv: GraphDiv | null;
    private rightGraphDiv: GraphDiv | null;
    private editorGraphDiv: GraphDiv | null;
    private showWeights: boolean;
    private isSimulationRunning: boolean;
    private isChangingStartEndNode: boolean;
    private customGraph: GraphStructure | null;
    private dropdowns: Dropdowns | null;

    private readonly TUTORIAL_PAGE_MIN = 1;
    private readonly TUTORIAL_PAGE_MAX = 10;

    private constructor() {
        const savedData = this.loadFromLocalStorage();
        if (savedData) {
            this.gridSize = savedData.gridSize;
            this.graph = savedData.graph;
            this.startNode = savedData.startNode;
            this.endNode = savedData.endNode;
            this.showTutorial = savedData.showTutorial;
            this.weightType = savedData.weightType;
            this.graphType = savedData.graphType;
            this.stepIncrement = savedData.stepIncrement;
            this.heuristicType = savedData.heuristicType;
            this.simulationSpeed = savedData.simulationSpeed;
            this.customGraph = savedData.customGraph;
        } else {
            this.gridSize = 400;
            this.graph = createBasicGridGraph(true, this.gridSize);
            const { startNode, endNode } = generateStartAndEndNode(this.graph, this.gridSize);
            this.startNode = startNode;
            this.endNode = endNode;
            this.showTutorial = true;
            this.weightType = WeightType.NonNegative;
            this.graphType = GraphType.Standard;
            this.stepIncrement = AVERAGE_SPEED;
            this.heuristicType = HeuristicType.Euclidean;
            this.simulationSpeed = SimulationSpeed.Average;
            this.customGraph = null;
        }
        this.runResults = [];
        this.endNodeReachable = false;
        this.containsNegativeWeightCycle = false;
        this.tutorialPageNumber = this.TUTORIAL_PAGE_MIN;
        this.rightGraphDiv = null;
        this.leftGraphDiv = null;
        this.editorGraphDiv = null;
        this.showWeights = false;
        this.isSimulationRunning = false;
        this.isChangingStartEndNode = false;
        this.dropdowns = null;
    }

    public static getInstance(): GlobalVariablesManager {
        if (!GlobalVariablesManager.instance) {
            GlobalVariablesManager.instance = new GlobalVariablesManager();
        }
        return GlobalVariablesManager.instance;
    }

    public setGraph(graph: GraphStructure): void {
        this.graph = graph;
    }

    public setNodes(nodes: Node[]): void {
        this.graph.nodes = nodes;
    }

    public getGraph(): GraphStructure {
        return this.graph;
    }

    public setGridSize(newGridSize: number): void {
        this.gridSize = newGridSize;
    }

    public getGridSize(): number {
        return this.gridSize;
    }

    public setRunResults(runResults: RunResults[]): void {
        this.runResults = runResults;
    }

    public getRunResults(): RunResults[] {
        return this.runResults;
    }

    public setStartNode(newStartNode: number): void {
        this.startNode = newStartNode;
    }

    public getStartNode(): number {
        return this.startNode;
    }

    public setEndNode(newEndNode: number): void {
        this.endNode = newEndNode;
    }

    public getEndNode(): number {
        return this.endNode;
    }

    public setGraphType(graphType: GraphType): void {
        this.graphType = graphType;
    }

    public getGraphType(): GraphType {
        return this.graphType;
    }

    public setWeightType(weightType: WeightType) {
        this.weightType = weightType;
    }

    public getWeightType(): WeightType {
        return this.weightType;
    }

    public setStepIncrement(stepIncrement: number): void {
        this.stepIncrement = stepIncrement;
    }

    public getStepIncrement(): number {
        return this.stepIncrement;
    }

    public setEndNodeReachable(endNodeReachable: boolean): void {
        this.endNodeReachable = endNodeReachable;
    }

    public isEndNodeReachable(): boolean {
        return this.endNodeReachable;
    }

    public getContainsNegativeWeightCycle(): boolean {
        return this.containsNegativeWeightCycle;
    }

    public setContainsNegativeWeightCycle(containsNegativeWeightCycle: boolean): void {
        this.containsNegativeWeightCycle = containsNegativeWeightCycle;
    }

    public getHeuristicType(): HeuristicType {
        return this.heuristicType;
    }

    public setHeuristicType(newType: HeuristicType) {
        this.heuristicType = newType;
    }

    public getSimulationSpeed(): SimulationSpeed {
        return this.simulationSpeed;
    }

    public setSimulationSpeed(simulationSpeed: SimulationSpeed) {
        this.simulationSpeed = simulationSpeed;
    }

    public getShowTutorial(): boolean {
        return this.showTutorial;
    }

    public setShowTutorial(showTutorial: boolean) {
        this.showTutorial = showTutorial;
    }

    public getTutorialPageNumber(): number {
        return this.tutorialPageNumber;
    }

    public incrementTutorialPageNumber(): number {
        return this.tutorialPageNumber < this.TUTORIAL_PAGE_MAX
            ? ++this.tutorialPageNumber
            : this.tutorialPageNumber;
    }

    public decrementTutorialPageNumber(): number {
        return this.tutorialPageNumber > this.TUTORIAL_PAGE_MIN
            ? --this.tutorialPageNumber
            : this.tutorialPageNumber;
    }

    public setTutorialPageNumber(pageNumber: number): void {
        if (pageNumber >= this.TUTORIAL_PAGE_MIN && pageNumber <= this.TUTORIAL_PAGE_MAX) {
            this.tutorialPageNumber = pageNumber;
        }
    }

    public getTutorialPageMin(): number {
        return this.TUTORIAL_PAGE_MIN;
    }

    public getGraphDivs(isEditor: boolean): GraphDiv[] {
        if (isEditor && this.editorGraphDiv) {
            return [this.editorGraphDiv];
        } else if (!isEditor && this.leftGraphDiv && this.rightGraphDiv) {
            return [this.leftGraphDiv, this.rightGraphDiv];
        } else {
            return [];
        }
    }

    public setGraphDivs(leftGraphDiv: GraphDiv, rightGraphDiv: GraphDiv): void {
        this.leftGraphDiv = leftGraphDiv;
        this.rightGraphDiv = rightGraphDiv;
    }

    public setGraphDiv(graphDiv: GraphDiv, position: GRAPH_POSITION) {
        if (position === GRAPH_POSITION.LEFT) {
            this.leftGraphDiv = graphDiv;
        } else if (position === GRAPH_POSITION.RIGHT) {
            this.rightGraphDiv = graphDiv;
        }
    }

    public setEditorGraphDiv(editorGraphDiv: GraphDiv): void {
        this.editorGraphDiv = editorGraphDiv;
    }

    public setGraphDivAlgorithmType(position: GRAPH_POSITION, algorithmType: AlgorithmType): void {
        if (!this.leftGraphDiv || !this.rightGraphDiv) {
            return;
        }
        switch (position) {
            case GRAPH_POSITION.LEFT:
                this.leftGraphDiv.algorithmType = algorithmType;
                break;
            case GRAPH_POSITION.RIGHT:
                this.rightGraphDiv.algorithmType = algorithmType;
                break;
        }
    }

    public isMazeGraph() {
        return (
            this.graphType === GraphType.DFS ||
            this.graphType === GraphType.RecursiveDivision ||
            this.graphType === GraphType.RandomWalls
        );
    }

    public shouldShowWeights() {
        return this.showWeights;
    }

    public setShowWeights(showWeights: boolean) {
        this.showWeights = showWeights;
    }

    public getIsSimulationRunning(): boolean {
        return this.isSimulationRunning;
    }

    public stopSimulation() {
        this.isSimulationRunning = false;
    }

    public setIsSimulationRunning() {
        this.isSimulationRunning = true;
    }

    public getIsChangingStartEndNode(): boolean {
        return this.isChangingStartEndNode;
    }

    public setIsChangingStartEndNode(isChangingStartEndNode: boolean) {
        this.isChangingStartEndNode = isChangingStartEndNode;
    }

    public setCustomGraph(customGraph: GraphStructure): void {
        this.customGraph = customGraph;
    }

    public getCustomGraph(): GraphStructure | null {
        return this.customGraph;
    }

    public setDropdowns(dropdowns: Dropdowns): void {
        this.dropdowns = dropdowns;
    }

    public getDropdowns(): Dropdowns | null {
        return this.dropdowns;
    }

    public saveToLocalStorage(): void {
        const serializedGraph = {
            ...this.graph,
            nodes: this.graph.nodes.map((weight) => (weight === Infinity ? 'Infinity' : weight)),
        };

        const serializedCustomGraph = this.customGraph
            ? {
                  ...this.customGraph,
                  nodes: this.customGraph.nodes.map((weight) =>
                      weight === Infinity ? 'Infinity' : weight,
                  ),
              }
            : null;

        const data = {
            graph: serializedGraph,
            gridSize: this.gridSize,
            startNode: this.startNode,
            endNode: this.endNode,
            showTutorial: this.showTutorial,
            weightType: this.weightType,
            graphType: this.graphType,
            stepIncrement: this.stepIncrement,
            heuristicType: this.heuristicType,
            simulationSpeed: this.simulationSpeed,
            customGraph: serializedCustomGraph,
        };

        localStorage.setItem('pathium-global-variables', JSON.stringify(data));
    }

    private loadFromLocalStorage(): {
        gridSize: number;
        graph: GraphStructure;
        startNode: number;
        endNode: number;
        showTutorial: boolean;
        weightType: WeightType;
        graphType: GraphType;
        stepIncrement: number;
        heuristicType: HeuristicType;
        simulationSpeed: SimulationSpeed;
        customGraph: GraphStructure | null;
    } | null {
        const data =
            '{"graph":{"graph":{"0":[1,20],"1":[2,0,21],"2":[1,22,3],"3":[2,23,4],"4":[24,3,5],"5":[4,6,25],"6":[26,7,5],"7":[8,27,6],"8":[9,28,7],"9":[10,8,29],"10":[9,30,11],"11":[31,12,10],"12":[11,13,32],"13":[33,12,14],"14":[13,34,15],"15":[35,16,14],"16":[17,36,15],"17":[18,16,37],"18":[19,38,17],"19":[18,39],"20":[21,0,40],"21":[1,22,41,20],"22":[42,23,21,2],"23":[22,3,24,43],"24":[25,44,23,4],"25":[45,5,24,26],"26":[6,25,27,46],"27":[47,26,7,28],"28":[29,27,48,8],"29":[28,9,49,30],"30":[10,29,31,50],"31":[11,51,32,30],"32":[12,31,52,33],"33":[53,34,32,13],"34":[33,54,14,35],"35":[55,34,15,36],"36":[37,56,35,16],"37":[36,38,57,17],"38":[58,18,37,39],"39":[19,59,38],"40":[41,20,60],"41":[21,61,40,42],"42":[62,43,22,41],"43":[23,42,63,44],"44":[45,24,43,64],"45":[65,25,46,44],"46":[45,66,47,26],"47":[46,48,67,27],"48":[28,49,47,68],"49":[50,29,69,48],"50":[49,51,30,70],"51":[31,52,71,50],"52":[32,72,53,51],"53":[33,52,73,54],"54":[74,53,34,55],"55":[56,75,54,35],"56":[36,57,55,76],"57":[37,77,56,58],"58":[38,59,78,57],"59":[79,39,58],"60":[80,61,40],"61":[60,62,81,41],"62":[61,63,82,42],"63":[64,62,83,43],"64":[63,65,84,44],"65":[66,85,45,64],"66":[86,46,65,67],"67":[68,47,87,66],"68":[69,48,67,88],"69":[70,89,68,49],"70":[90,69,71,50],"71":[70,51,72,91],"72":[52,92,73,71],"73":[93,72,74,53],"74":[73,54,94,75],"75":[95,76,74,55],"76":[56,75,77,96],"77":[97,76,57,78],"78":[98,77,58,79],"79":[59,99,78],"80":[100,81,60],"81":[101,80,82,61],"82":[62,83,81,102],"83":[63,82,84,103],"84":[83,85,64,104],"85":[86,65,105,84],"86":[87,66,85,106],"87":[67,86,88,107],"88":[68,89,87,108],"89":[90,109,88,69],"90":[89,70,110,91],"91":[71,111,92,90],"92":[93,72,112,91],"93":[113,73,94,92],"94":[74,93,114,95],"95":[75,115,94,96],"96":[95,116,76,97],"97":[77,96,98,117],"98":[97,118,78,99],"99":[119,98,79],"100":[101,80,120],"101":[102,121,100,81],"102":[103,82,101,122],"103":[83,104,123,102],"104":[84,103,105,124],"105":[85,104,125,106],"106":[107,105,126,86],"107":[108,87,127,106],"108":[109,107,88,128],"109":[110,89,108,129],"110":[130,111,109,90],"111":[110,112,91,131],"112":[111,113,132,92],"113":[93,114,133,112],"114":[115,134,94,113],"115":[116,135,114,95],"116":[117,96,115,136],"117":[97,118,116,137],"118":[119,138,98,117],"119":[139,118,99],"120":[100,140,121],"121":[120,122,141,101],"122":[123,121,102,142],"123":[122,124,103,143],"124":[144,123,125,104],"125":[126,105,124,145],"126":[146,127,106,125],"127":[107,128,147,126],"128":[148,108,129,127],"129":[130,149,128,109],"130":[129,131,110,150],"131":[130,151,132,111],"132":[152,112,131,133],"133":[134,153,132,113],"134":[135,154,133,114],"135":[134,136,155,115],"136":[135,156,137,116],"137":[136,117,138,157],"138":[118,139,137,158],"139":[119,159,138],"140":[120,141,160],"141":[161,121,140,142],"142":[122,162,141,143],"143":[144,123,163,142],"144":[164,124,143,145],"145":[125,146,144,165],"146":[166,145,147,126],"147":[146,167,127,148],"148":[147,168,128,149],"149":[148,150,129,169],"150":[130,149,151,170],"151":[152,150,131,171],"152":[151,153,172,132],"153":[154,152,173,133],"154":[134,153,155,174],"155":[156,154,135,175],"156":[136,176,155,157],"157":[156,177,137,158],"158":[159,157,138,178],"159":[158,179,139],"160":[161,180,140],"161":[162,181,141,160],"162":[161,182,142,163],"163":[162,164,183,143],"164":[144,165,163,184],"165":[145,164,166,185],"166":[146,167,165,186],"167":[147,166,168,187],"168":[169,188,167,148],"169":[170,168,149,189],"170":[171,169,150,190],"171":[151,170,172,191],"172":[192,173,171,152],"173":[153,193,172,174],"174":[194,154,173,175],"175":[176,195,155,174],"176":[156,175,196,177],"177":[197,176,178,157],"178":[177,158,198,179],"179":[159,178,199],"180":[200,181,160],"181":[182,180,201,161],"182":[181,183,202,162],"183":[203,163,182,184],"184":[204,164,183,185],"185":[165,205,184,186],"186":[166,206,185,187],"187":[167,186,207,188],"188":[187,189,208,168],"189":[190,169,209,188],"190":[170,210,191,189],"191":[192,211,190,171],"192":[193,191,212,172],"193":[194,192,213,173],"194":[174,214,193,195],"195":[215,194,196,175],"196":[197,216,176,195],"197":[177,198,196,217],"198":[197,218,199,178],"199":[179,219,198],"200":[220,201,180],"201":[200,202,181,221],"202":[201,182,222,203],"203":[183,202,204,223],"204":[205,224,184,203],"205":[225,206,204,185],"206":[226,186,207,205],"207":[187,206,227,208],"208":[209,207,188,228],"209":[189,208,210,229],"210":[190,230,209,211],"211":[191,231,210,212],"212":[192,211,213,232],"213":[212,214,233,193],"214":[215,194,213,234],"215":[216,214,235,195],"216":[196,236,217,215],"217":[216,197,218,237],"218":[217,238,219,198],"219":[239,218,199],"220":[240,221,200],"221":[222,201,241,220],"222":[221,223,242,202],"223":[222,224,243,203],"224":[204,223,244,225],"225":[245,205,224,226],"226":[206,227,225,246],"227":[226,207,247,228],"228":[208,227,229,248],"229":[249,230,209,228],"230":[250,231,210,229],"231":[211,251,230,232],"232":[231,212,252,233],"233":[234,253,213,232],"234":[214,233,235,254],"235":[234,236,215,255],"236":[256,235,216,237],"237":[236,238,217,257],"238":[239,258,237,218],"239":[238,219,259],"240":[260,220,241],"241":[242,240,221,261],"242":[241,222,262,243],"243":[223,242,263,244],"244":[224,243,264,245],"245":[225,244,246,265],"246":[245,247,226,266],"247":[246,227,248,267],"248":[228,249,268,247],"249":[250,229,248,269],"250":[270,230,251,249],"251":[252,271,250,231],"252":[272,232,251,253],"253":[273,252,233,254],"254":[274,253,234,255],"255":[254,235,275,256],"256":[257,255,236,276],"257":[277,258,256,237],"258":[278,238,257,259],"259":[279,239,258],"260":[240,280,261],"261":[281,262,260,241],"262":[242,263,282,261],"263":[262,243,264,283],"264":[263,284,244,265],"265":[285,266,245,264],"266":[286,265,267,246],"267":[287,266,268,247],"268":[269,288,248,267],"269":[268,289,270,249],"270":[269,250,290,271],"271":[272,291,270,251],"272":[271,252,292,273],"273":[272,293,253,274],"274":[294,254,273,275],"275":[276,274,295,255],"276":[275,256,277,296],"277":[276,297,278,257],"278":[277,298,258,279],"279":[259,299,278],"280":[281,300,260],"281":[282,280,301,261],"282":[283,281,262,302],"283":[282,263,303,284],"284":[285,264,283,304],"285":[286,265,284,305],"286":[306,266,285,287],"287":[267,307,286,288],"288":[308,268,287,289],"289":[290,269,288,309],"290":[270,291,289,310],"291":[271,311,290,292],"292":[291,272,312,293],"293":[313,294,292,273],"294":[314,295,274,293],"295":[275,315,296,294],"296":[295,297,276,316],"297":[277,298,296,317],"298":[278,297,299,318],"299":[319,279,298],"300":[320,301,280],"301":[281,321,300,302],"302":[322,301,303,282],"303":[323,304,302,283],"304":[284,324,305,303],"305":[325,306,304,285],"306":[326,286,307,305],"307":[308,287,306,327],"308":[309,288,328,307],"309":[329,308,289,310],"310":[311,290,309,330],"311":[291,331,310,312],"312":[332,292,311,313],"313":[314,293,333,312],"314":[313,294,315,334],"315":[335,314,295,316],"316":[315,336,317,296],"317":[297,318,337,316],"318":[338,319,298,317],"319":[339,299,318],"320":[340,321,300],"321":[320,341,322,301],"322":[342,321,323,302],"323":[322,303,324,343],"324":[344,323,304,325],"325":[345,324,326,305],"326":[346,327,325,306],"327":[328,326,347,307],"328":[348,327,329,308],"329":[330,349,309,328],"330":[310,331,350,329],"331":[330,311,351,332],"332":[333,312,331,352],"333":[353,334,313,332],"334":[335,333,314,354],"335":[334,336,355,315],"336":[337,356,316,335],"337":[357,336,338,317],"338":[358,337,318,339],"339":[359,319,338],"340":[360,341,320],"341":[342,321,340,361],"342":[322,343,341,362],"343":[323,363,342,344],"344":[324,345,364,343],"345":[346,344,325,365],"346":[366,347,345,326],"347":[348,346,367,327],"348":[347,349,368,328],"349":[369,348,350,329],"350":[370,351,330,349],"351":[350,331,352,371],"352":[351,332,353,372],"353":[333,354,352,373],"354":[353,355,334,374],"355":[335,375,354,356],"356":[357,336,376,355],"357":[358,377,356,337],"358":[357,338,359,378],"359":[339,379,358],"360":[380,361,340],"361":[362,341,381,360],"362":[363,342,361,382],"363":[362,383,364,343],"364":[363,365,384,344],"365":[366,385,364,345],"366":[365,386,367,346],"367":[347,368,387,366],"368":[369,348,367,388],"369":[370,389,349,368],"370":[369,371,350,390],"371":[372,370,351,391],"372":[371,392,373,352],"373":[374,393,353,372],"374":[354,375,394,373],"375":[395,374,355,376],"376":[396,375,377,356],"377":[357,397,376,378],"378":[398,379,377,358],"379":[359,378,399],"380":[360,381],"381":[382,380,361],"382":[362,383,381],"383":[382,363,384],"384":[364,383,385],"385":[384,386,365],"386":[366,385,387],"387":[388,386,367],"388":[389,387,368],"389":[390,388,369],"390":[389,370,391],"391":[392,390,371],"392":[393,391,372],"393":[373,392,394],"394":[395,393,374],"395":[375,394,396],"396":[397,376,395],"397":[398,377,396],"398":[399,378,397],"399":[379,398]},"nodes":["Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",10,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",98,"Infinity","Infinity",17,70,45,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",2,55,"Infinity","Infinity",6,4,14,"Infinity",1,8,16,16,39,69,1,9,1,30,27,4,59,15,"Infinity","Infinity",2,15,5,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",15,8,56,97,1,13,3,27,45,"Infinity","Infinity","Infinity",12,3,2,73,7,1,2,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",4,17,2,67,"Infinity","Infinity",84,1,50,50,50,50,50,50,50,3,1,43,84,"Infinity","Infinity",1,2,13,"Infinity","Infinity",67,50,50,6,15,18,13,3,50,4,6,19,1,16,34,"Infinity",16,91,"Infinity","Infinity","Infinity",68,17,32,38,10,23,3,50,3,48,1,1,25,37,"Infinity","Infinity",3,"Infinity","Infinity","Infinity",64,12,16,1,86,6,25,50,50,1,1,73,5,1,67,"Infinity",45,"Infinity",32,"Infinity",50,50,50,2,9,77,15,54,50,3,4,27,52,1,20,"Infinity",14,"Infinity",4,"Infinity",50,6,50,50,7,18,29,2,16,50,59,2,7,1,86,"Infinity","Infinity","Infinity",50,"Infinity","Infinity",50,50,50,50,20,6,34,1,50,50,1,75,61,51,23,"Infinity","Infinity",8,26,"Infinity",21,52,22,50,4,1,1,11,50,50,3,72,1,1,53,"Infinity","Infinity",1,59,50,50,22,27,50,1,8,8,50,50,11,11,77,3,11,7,"Infinity","Infinity",2,2,8,"Infinity","Infinity",35,1,50,50,50,50,1,34,54,20,69,78,2,"Infinity","Infinity",1,9,60,7,"Infinity","Infinity","Infinity","Infinity",20,5,36,11,2,46,1,3,70,13,"Infinity","Infinity",5,1,13,48,20,1,1,"Infinity","Infinity",74,33,91,93,12,1,10,3,"Infinity","Infinity","Infinity",21,4,15,1,87,41,38,5,1,"Infinity","Infinity","Infinity",18,2,16,70,"Infinity","Infinity",12,"Infinity",84,2,21,10,3,2,11,80,5,2,95,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",10,52,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity"]},"gridSize":400,"startNode":257,"endNode":301,"showTutorial":false,"weightType":"Non-Negative","graphType":"Custom","stepIncrement":100,"heuristicType":"Euclidean","simulationSpeed":"Average","customGraph":{"graph":{"0":[1,20],"1":[2,0,21],"2":[1,22,3],"3":[2,23,4],"4":[24,3,5],"5":[4,6,25],"6":[26,7,5],"7":[8,27,6],"8":[9,28,7],"9":[10,8,29],"10":[9,30,11],"11":[31,12,10],"12":[11,13,32],"13":[33,12,14],"14":[13,34,15],"15":[35,16,14],"16":[17,36,15],"17":[18,16,37],"18":[19,38,17],"19":[18,39],"20":[21,0,40],"21":[1,22,41,20],"22":[42,23,21,2],"23":[22,3,24,43],"24":[25,44,23,4],"25":[45,5,24,26],"26":[6,25,27,46],"27":[47,26,7,28],"28":[29,27,48,8],"29":[28,9,49,30],"30":[10,29,31,50],"31":[11,51,32,30],"32":[12,31,52,33],"33":[53,34,32,13],"34":[33,54,14,35],"35":[55,34,15,36],"36":[37,56,35,16],"37":[36,38,57,17],"38":[58,18,37,39],"39":[19,59,38],"40":[41,20,60],"41":[21,61,40,42],"42":[62,43,22,41],"43":[23,42,63,44],"44":[45,24,43,64],"45":[65,25,46,44],"46":[45,66,47,26],"47":[46,48,67,27],"48":[28,49,47,68],"49":[50,29,69,48],"50":[49,51,30,70],"51":[31,52,71,50],"52":[32,72,53,51],"53":[33,52,73,54],"54":[74,53,34,55],"55":[56,75,54,35],"56":[36,57,55,76],"57":[37,77,56,58],"58":[38,59,78,57],"59":[79,39,58],"60":[80,61,40],"61":[60,62,81,41],"62":[61,63,82,42],"63":[64,62,83,43],"64":[63,65,84,44],"65":[66,85,45,64],"66":[86,46,65,67],"67":[68,47,87,66],"68":[69,48,67,88],"69":[70,89,68,49],"70":[90,69,71,50],"71":[70,51,72,91],"72":[52,92,73,71],"73":[93,72,74,53],"74":[73,54,94,75],"75":[95,76,74,55],"76":[56,75,77,96],"77":[97,76,57,78],"78":[98,77,58,79],"79":[59,99,78],"80":[100,81,60],"81":[101,80,82,61],"82":[62,83,81,102],"83":[63,82,84,103],"84":[83,85,64,104],"85":[86,65,105,84],"86":[87,66,85,106],"87":[67,86,88,107],"88":[68,89,87,108],"89":[90,109,88,69],"90":[89,70,110,91],"91":[71,111,92,90],"92":[93,72,112,91],"93":[113,73,94,92],"94":[74,93,114,95],"95":[75,115,94,96],"96":[95,116,76,97],"97":[77,96,98,117],"98":[97,118,78,99],"99":[119,98,79],"100":[101,80,120],"101":[102,121,100,81],"102":[103,82,101,122],"103":[83,104,123,102],"104":[84,103,105,124],"105":[85,104,125,106],"106":[107,105,126,86],"107":[108,87,127,106],"108":[109,107,88,128],"109":[110,89,108,129],"110":[130,111,109,90],"111":[110,112,91,131],"112":[111,113,132,92],"113":[93,114,133,112],"114":[115,134,94,113],"115":[116,135,114,95],"116":[117,96,115,136],"117":[97,118,116,137],"118":[119,138,98,117],"119":[139,118,99],"120":[100,140,121],"121":[120,122,141,101],"122":[123,121,102,142],"123":[122,124,103,143],"124":[144,123,125,104],"125":[126,105,124,145],"126":[146,127,106,125],"127":[107,128,147,126],"128":[148,108,129,127],"129":[130,149,128,109],"130":[129,131,110,150],"131":[130,151,132,111],"132":[152,112,131,133],"133":[134,153,132,113],"134":[135,154,133,114],"135":[134,136,155,115],"136":[135,156,137,116],"137":[136,117,138,157],"138":[118,139,137,158],"139":[119,159,138],"140":[120,141,160],"141":[161,121,140,142],"142":[122,162,141,143],"143":[144,123,163,142],"144":[164,124,143,145],"145":[125,146,144,165],"146":[166,145,147,126],"147":[146,167,127,148],"148":[147,168,128,149],"149":[148,150,129,169],"150":[130,149,151,170],"151":[152,150,131,171],"152":[151,153,172,132],"153":[154,152,173,133],"154":[134,153,155,174],"155":[156,154,135,175],"156":[136,176,155,157],"157":[156,177,137,158],"158":[159,157,138,178],"159":[158,179,139],"160":[161,180,140],"161":[162,181,141,160],"162":[161,182,142,163],"163":[162,164,183,143],"164":[144,165,163,184],"165":[145,164,166,185],"166":[146,167,165,186],"167":[147,166,168,187],"168":[169,188,167,148],"169":[170,168,149,189],"170":[171,169,150,190],"171":[151,170,172,191],"172":[192,173,171,152],"173":[153,193,172,174],"174":[194,154,173,175],"175":[176,195,155,174],"176":[156,175,196,177],"177":[197,176,178,157],"178":[177,158,198,179],"179":[159,178,199],"180":[200,181,160],"181":[182,180,201,161],"182":[181,183,202,162],"183":[203,163,182,184],"184":[204,164,183,185],"185":[165,205,184,186],"186":[166,206,185,187],"187":[167,186,207,188],"188":[187,189,208,168],"189":[190,169,209,188],"190":[170,210,191,189],"191":[192,211,190,171],"192":[193,191,212,172],"193":[194,192,213,173],"194":[174,214,193,195],"195":[215,194,196,175],"196":[197,216,176,195],"197":[177,198,196,217],"198":[197,218,199,178],"199":[179,219,198],"200":[220,201,180],"201":[200,202,181,221],"202":[201,182,222,203],"203":[183,202,204,223],"204":[205,224,184,203],"205":[225,206,204,185],"206":[226,186,207,205],"207":[187,206,227,208],"208":[209,207,188,228],"209":[189,208,210,229],"210":[190,230,209,211],"211":[191,231,210,212],"212":[192,211,213,232],"213":[212,214,233,193],"214":[215,194,213,234],"215":[216,214,235,195],"216":[196,236,217,215],"217":[216,197,218,237],"218":[217,238,219,198],"219":[239,218,199],"220":[240,221,200],"221":[222,201,241,220],"222":[221,223,242,202],"223":[222,224,243,203],"224":[204,223,244,225],"225":[245,205,224,226],"226":[206,227,225,246],"227":[226,207,247,228],"228":[208,227,229,248],"229":[249,230,209,228],"230":[250,231,210,229],"231":[211,251,230,232],"232":[231,212,252,233],"233":[234,253,213,232],"234":[214,233,235,254],"235":[234,236,215,255],"236":[256,235,216,237],"237":[236,238,217,257],"238":[239,258,237,218],"239":[238,219,259],"240":[260,220,241],"241":[242,240,221,261],"242":[241,222,262,243],"243":[223,242,263,244],"244":[224,243,264,245],"245":[225,244,246,265],"246":[245,247,226,266],"247":[246,227,248,267],"248":[228,249,268,247],"249":[250,229,248,269],"250":[270,230,251,249],"251":[252,271,250,231],"252":[272,232,251,253],"253":[273,252,233,254],"254":[274,253,234,255],"255":[254,235,275,256],"256":[257,255,236,276],"257":[277,258,256,237],"258":[278,238,257,259],"259":[279,239,258],"260":[240,280,261],"261":[281,262,260,241],"262":[242,263,282,261],"263":[262,243,264,283],"264":[263,284,244,265],"265":[285,266,245,264],"266":[286,265,267,246],"267":[287,266,268,247],"268":[269,288,248,267],"269":[268,289,270,249],"270":[269,250,290,271],"271":[272,291,270,251],"272":[271,252,292,273],"273":[272,293,253,274],"274":[294,254,273,275],"275":[276,274,295,255],"276":[275,256,277,296],"277":[276,297,278,257],"278":[277,298,258,279],"279":[259,299,278],"280":[281,300,260],"281":[282,280,301,261],"282":[283,281,262,302],"283":[282,263,303,284],"284":[285,264,283,304],"285":[286,265,284,305],"286":[306,266,285,287],"287":[267,307,286,288],"288":[308,268,287,289],"289":[290,269,288,309],"290":[270,291,289,310],"291":[271,311,290,292],"292":[291,272,312,293],"293":[313,294,292,273],"294":[314,295,274,293],"295":[275,315,296,294],"296":[295,297,276,316],"297":[277,298,296,317],"298":[278,297,299,318],"299":[319,279,298],"300":[320,301,280],"301":[281,321,300,302],"302":[322,301,303,282],"303":[323,304,302,283],"304":[284,324,305,303],"305":[325,306,304,285],"306":[326,286,307,305],"307":[308,287,306,327],"308":[309,288,328,307],"309":[329,308,289,310],"310":[311,290,309,330],"311":[291,331,310,312],"312":[332,292,311,313],"313":[314,293,333,312],"314":[313,294,315,334],"315":[335,314,295,316],"316":[315,336,317,296],"317":[297,318,337,316],"318":[338,319,298,317],"319":[339,299,318],"320":[340,321,300],"321":[320,341,322,301],"322":[342,321,323,302],"323":[322,303,324,343],"324":[344,323,304,325],"325":[345,324,326,305],"326":[346,327,325,306],"327":[328,326,347,307],"328":[348,327,329,308],"329":[330,349,309,328],"330":[310,331,350,329],"331":[330,311,351,332],"332":[333,312,331,352],"333":[353,334,313,332],"334":[335,333,314,354],"335":[334,336,355,315],"336":[337,356,316,335],"337":[357,336,338,317],"338":[358,337,318,339],"339":[359,319,338],"340":[360,341,320],"341":[342,321,340,361],"342":[322,343,341,362],"343":[323,363,342,344],"344":[324,345,364,343],"345":[346,344,325,365],"346":[366,347,345,326],"347":[348,346,367,327],"348":[347,349,368,328],"349":[369,348,350,329],"350":[370,351,330,349],"351":[350,331,352,371],"352":[351,332,353,372],"353":[333,354,352,373],"354":[353,355,334,374],"355":[335,375,354,356],"356":[357,336,376,355],"357":[358,377,356,337],"358":[357,338,359,378],"359":[339,379,358],"360":[380,361,340],"361":[362,341,381,360],"362":[363,342,361,382],"363":[362,383,364,343],"364":[363,365,384,344],"365":[366,385,364,345],"366":[365,386,367,346],"367":[347,368,387,366],"368":[369,348,367,388],"369":[370,389,349,368],"370":[369,371,350,390],"371":[372,370,351,391],"372":[371,392,373,352],"373":[374,393,353,372],"374":[354,375,394,373],"375":[395,374,355,376],"376":[396,375,377,356],"377":[357,397,376,378],"378":[398,379,377,358],"379":[359,378,399],"380":[360,381],"381":[382,380,361],"382":[362,383,381],"383":[382,363,384],"384":[364,383,385],"385":[384,386,365],"386":[366,385,387],"387":[388,386,367],"388":[389,387,368],"389":[390,388,369],"390":[389,370,391],"391":[392,390,371],"392":[393,391,372],"393":[373,392,394],"394":[395,393,374],"395":[375,394,396],"396":[397,376,395],"397":[398,377,396],"398":[399,378,397],"399":[379,398]},"nodes":["Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",10,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",98,"Infinity","Infinity",17,70,45,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",2,55,"Infinity","Infinity",6,4,14,"Infinity",1,8,16,16,39,69,1,9,1,30,27,4,59,15,"Infinity","Infinity",2,15,5,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",15,8,56,97,1,13,3,27,45,"Infinity","Infinity","Infinity",12,3,2,73,7,1,2,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",4,17,2,67,"Infinity","Infinity",84,1,50,50,50,50,50,50,50,3,1,43,84,"Infinity","Infinity",1,2,13,"Infinity","Infinity",67,50,50,6,15,18,13,3,50,4,6,19,1,16,34,"Infinity",16,91,"Infinity","Infinity","Infinity",68,17,32,38,10,23,3,50,3,48,1,1,25,37,"Infinity","Infinity",3,"Infinity","Infinity","Infinity",64,12,16,1,86,6,25,50,50,1,1,73,5,1,67,"Infinity",45,"Infinity",32,"Infinity",50,50,50,2,9,77,15,54,50,3,4,27,52,1,20,"Infinity",14,"Infinity",4,"Infinity",50,6,50,50,7,18,29,2,16,50,59,2,7,1,86,"Infinity","Infinity","Infinity",50,"Infinity","Infinity",50,50,50,50,20,6,34,1,50,50,1,75,61,51,23,"Infinity","Infinity",8,26,"Infinity",21,52,22,50,4,1,1,11,50,50,3,72,1,1,53,"Infinity","Infinity",1,59,50,50,22,27,50,1,8,8,50,50,11,11,77,3,11,7,"Infinity","Infinity",2,2,8,"Infinity","Infinity",35,1,50,50,50,50,1,34,54,20,69,78,2,"Infinity","Infinity",1,9,60,7,"Infinity","Infinity","Infinity","Infinity",20,5,36,11,2,46,1,3,70,13,"Infinity","Infinity",5,1,13,48,20,1,1,"Infinity","Infinity",74,33,91,93,12,1,10,3,"Infinity","Infinity","Infinity",21,4,15,1,87,41,38,5,1,"Infinity","Infinity","Infinity",18,2,16,70,"Infinity","Infinity",12,"Infinity",84,2,21,10,3,2,11,80,5,2,95,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity",10,52,"Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity","Infinity"]}}';
        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data);
        const parsedGraph: GraphStructure = {
            ...parsedData.graph,
            nodes: parsedData.graph.nodes.map((weight: string | number) =>
                weight === 'Infinity' ? Infinity : weight,
            ),
        };
        const parsedCustomGraph: GraphStructure | null = parsedData.customGraph
            ? {
                  ...parsedData.customGraph,
                  nodes: parsedData.customGraph.nodes.map((weight: string | number) =>
                      weight === 'Infinity' ? Infinity : weight,
                  ),
              }
            : null;
        return {
            gridSize: parsedData.gridSize,
            graph: parsedGraph,
            startNode: parsedData.startNode,
            endNode: parsedData.endNode,
            showTutorial: parsedData.showTutorial,
            weightType: parsedData.weightType,
            graphType: parsedData.graphType,
            stepIncrement: parsedData.stepIncrement,
            heuristicType: parsedData.heuristicType,
            simulationSpeed: parsedData.simulationSpeed,
            customGraph: parsedCustomGraph,
        };
    }
}

/**
 * Returns the singleton instance of the GlobalVariablesManager.
 * @returns {GlobalVariablesManager} The singleton instance.
 */
export const getGlobalVariablesManagerInstance = (): GlobalVariablesManager => {
    return GlobalVariablesManager.getInstance();
};
