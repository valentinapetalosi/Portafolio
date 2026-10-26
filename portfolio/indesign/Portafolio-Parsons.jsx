// Builds the Parsons portfolio as an editable InDesign document.
//
// How to run: InDesign > Window > Utilities > Scripts, right-click "User",
// "Reveal in Finder", copy this whole `indesign` folder there (or run it from
// the repo with File > Scripts > Other Script…), then double-click the script.
//
// Pages are 1920 × 1080 px (16:9). Titles use Snaga, text uses Neulis.
// Photos: put them in portfolio/images/<project>/ and set `src` below
// (e.g. "la-paz/01.jpg"); empty frames are named after the photo they expect
// (see the Layers panel) so you can also drag photos in by hand.

#target "InDesign"

var HERE = File($.fileName).parent;            // portfolio/indesign
var IMAGES = HERE.parent.fsName + "/images/";  // portfolio/images/

var DOC_FILM = "https://drive.google.com/file/d/1zyU_mubgoFsIHEC4O8hBdYf_bhJqt2Qz/view";

var PROJECTS = [
  {
    name: "Rayuela",
    type: "Public art · Participatory design",
    role: "Designer & project lead · 2024",
    slides: [
      {
        layout: "intro",
        title: "Rayuela",
        meta: [
          ["Where", "La Paz, Bogotá, Colombia"],
          ["Funding", "Museo Abierto de Bogotá grant, IDARTES · COP 38M"],
          ["Role", "Concept, design, budget and project lead"],
          ["Team", "3 artists I hired by open call, 3-person film crew"],
          ["Timeline", "Jan–Feb 2024 · 10 days on site"]
        ],
        text: "Women and girls don't use public space the way men and boys do, and they stop playing much younger. Rayuela turned half of the football court in La Paz, a stigmatised barrio born as an informal settlement, into 300 m² of play designed to bring them back.",
        images: [
          { src: "", label: "Court before the intervention" },
          { src: "", label: "Finished court, drone view" }
        ]
      },
      {
        layout: "triptych",
        columns: [
          { src: "", label: "Play workshop with children", text: "Listen. A play workshop with the neighbourhood's children mapped the games they already chalk on the ground." },
          { src: "", label: "Painting workshop / design proposals", text: "Co-design. A painting workshop showed the colours and shapes they wanted. I drew two proposals and the community voted." },
          { src: "", label: "Painting the court", text: "Build. Ten days of painting, planned around the daily rain, with water and power rented from neighbours' homes." }
        ]
      },
      {
        layout: "outcome",
        image: { src: "", label: "Girls playing on the finished court" },
        heading: "Outcome",
        figures: [
          ["300 m²", "of court painted with the community's design"],
          ["COP 38M", "public grant budgeted and executed"],
          ["2 → 1", "design proposals, chosen by community vote"],
          ["7", "people coordinated, plus a second team on the other half"]
        ],
        text: "Managing it meant postponed dates, a surface the paint supplier called unfit, and a shared court with another team. I learned to lock dates before committing money, and to earn neighbours' trust before the first coat.",
        link: { text: "Watch the documentary film →", url: DOC_FILM },
        side: { src: "", label: "Detail of the painted games" }
      }
    ]
  },
  { name: "Deriva Collection", type: "Brand management · Product design", role: "Founder & creative director · [year]", slides: [] },
  { name: "Ana María Cosméticos", type: "[Project type]", role: "[Role · year]", slides: [] },
  { name: "Jacarandas", type: "[Project type]", role: "[Role · year]", slides: [] }
];

// ---------------------------------------------------------------- geometry
var W = 1920, H = 1080, M = 72, GAP = 32;
var TOP = 100, BOTTOM = 1008;          // body area under the top strip
var INNER = W - 2 * M;                 // 1776

// ---------------------------------------------------------------- fonts
var missing = [];

var FAMILIES = app.fonts.everyItem().fontFamily;
var STYLES = app.fonts.everyItem().fontStyleName;

function findFont(hints, styles, label) {
  for (var h = 0; h < hints.length; h++) {
    for (var s = 0; s < styles.length; s++) {
      for (var i = 0; i < FAMILIES.length; i++) {
        if (FAMILIES[i].toLowerCase() === hints[h].toLowerCase() && STYLES[i] === styles[s]) return app.fonts[i];
      }
    }
  }
  // Any family that contains the first hint, any style
  for (var j = 0; j < FAMILIES.length; j++) {
    if (FAMILIES[j].toLowerCase().indexOf(hints[0].toLowerCase()) !== -1) return app.fonts[j];
  }
  missing.push(label);
  return null;
}

var TITLE_FONT = findFont(["Snaga"], ["Regular", "Medium", "Bold"], "Snaga");
var TEXT_FONT = findFont(["Neulis Sans", "Neulis Neue", "Neulis"], ["Regular", "Light", "Medium"], "Neulis (regular)");
var TEXT_BOLD = findFont(["Neulis Sans", "Neulis Neue", "Neulis"], ["SemiBold", "Semibold", "Bold", "Medium"], "Neulis (bold)");

// ---------------------------------------------------------------- document
var doc = app.documents.add(false);
doc.documentPreferences.intent = DocumentIntentOptions.WEB_INTENT;
doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.PIXELS;
doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.PIXELS;
doc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
doc.documentPreferences.facingPages = false;
doc.documentPreferences.pageWidth = W;
doc.documentPreferences.pageHeight = H;
doc.zeroPoint = [0, 0];

function rgb(name, v) {
  var c = doc.colors.add();
  c.properties = { name: name, model: ColorModel.PROCESS, space: ColorSpace.RGB, colorValue: v };
  return c;
}
var IVORY = rgb("Ivory", [246, 241, 231]);
var INK = rgb("Ink", [26, 24, 20]);
var SOFT = rgb("Soft", [107, 101, 90]);
var TONE = rgb("Photo frame", [233, 226, 212]);
var NONE = doc.swatches.itemByName("None");

// Master: ivory background + margins
var master = doc.masterSpreads[0];
master.pages[0].marginPreferences.properties = { top: TOP, left: M, right: M, bottom: H - BOTTOM };
var bg = master.pages[0].rectangles.add({ geometricBounds: [0, 0, H, W], fillColor: IVORY, strokeColor: NONE });
bg.locked = true;
doc.pages[0].marginPreferences.properties = { top: TOP, left: M, right: M, bottom: H - BOTTOM };

var notes = doc.layers.add({ name: "Placeholder notes (not printed)", printable: false, layerColor: UIColors.RED });
var content = doc.layers.itemByName("Layer 1");
if (!content.isValid) content = doc.layers[doc.layers.length - 1];
content.name = "Portfolio";
doc.activeLayer = content;

// ---------------------------------------------------------------- styles
function pStyle(name, props, font) {
  var st = doc.paragraphStyles.add({ name: name });
  if (font) st.appliedFont = font;
  st.fillColor = INK;
  st.hyphenation = false;
  st.properties = props;
  return st;
}
var S = {
  strip: pStyle("Strip", { pointSize: 19, leading: 23 }, TEXT_BOLD),
  cover: pStyle("Cover title", { pointSize: 110, leading: 110 }, TITLE_FONT),
  title: pStyle("Project title", { pointSize: 72, leading: 74, spaceAfter: 24 }, TITLE_FONT),
  h2: pStyle("Heading", { pointSize: 64, leading: 66, spaceAfter: 24 }, TITLE_FONT),
  body: pStyle("Body", { pointSize: 20, leading: 30 }, TEXT_FONT),
  lead: pStyle("Lead", { pointSize: 26, leading: 38 }, TEXT_FONT),
  meta: pStyle("Meta", { pointSize: 18, leading: 26 }, TEXT_FONT),
  caption: pStyle("Caption", { pointSize: 20, leading: 30 }, TEXT_FONT),
  figure: pStyle("Figure", { pointSize: 48, leading: 52 }, TITLE_FONT),
  figureLabel: pStyle("Figure label", { pointSize: 18, leading: 24 }, TEXT_FONT),
  list: pStyle("Index", { pointSize: 24, leading: 40 }, TEXT_FONT),
  note: pStyle("Placeholder note", { pointSize: 20, leading: 26, justification: Justification.CENTER_ALIGN }, TEXT_FONT)
};
S.meta.tabStops.add({ position: 110 });
S.list.tabStops.add({ position: 560, alignment: TabStopAlignment.RIGHT_ALIGN });
S.body.spaceBefore = 0;
S.note.fillColor = SOFT;

var bold = doc.characterStyles.add({ name: "Bold" });
if (TEXT_BOLD) bold.appliedFont = TEXT_BOLD;
var softCs = doc.characterStyles.add({ name: "Soft", fillColor: SOFT });
var linkCs = doc.characterStyles.add({ name: "Link", underline: true });
if (TEXT_BOLD) linkCs.appliedFont = TEXT_BOLD;

// ---------------------------------------------------------------- helpers
// paras: array of [text, paragraphStyle]
function text(page, bounds, paras, autoHeight) {
  var tf = page.textFrames.add({ geometricBounds: bounds, itemLayer: content });
  var lines = [];
  for (var i = 0; i < paras.length; i++) lines.push(paras[i][0]);
  tf.contents = lines.join("\r");
  for (var j = 0; j < paras.length; j++) tf.paragraphs[j].appliedParagraphStyle = paras[j][1];
  tf.textFramePreferences.insetSpacing = [0, 0, 0, 0];
  if (autoHeight) {
    tf.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
    tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
  }
  return tf;
}

// Photo frame: places the image when `src` exists, otherwise an empty
// graphic frame named after the photo it expects, plus a non-printing note.
function photo(page, bounds, im) {
  var r = page.rectangles.add({ geometricBounds: bounds, fillColor: TONE, strokeColor: NONE, itemLayer: content });
  r.contentType = ContentType.GRAPHIC_TYPE;
  r.name = "Photo: " + (im.label || "image");
  var f = im.src ? File(IMAGES + im.src) : null;
  if (f && f.exists) {
    r.place(f);
    r.fit(FitOptions.FILL_PROPORTIONALLY);
    r.fit(FitOptions.CENTER_CONTENT);
    r.fillColor = NONE;
  } else {
    var mid = (bounds[0] + bounds[2]) / 2;
    var note = page.textFrames.add({ geometricBounds: [mid - 20, bounds[1] + 20, mid + 20, bounds[3] - 20], itemLayer: notes });
    note.contents = im.label || "Photo";
    note.paragraphs[0].appliedParagraphStyle = S.note;
  }
  return r;
}

function strip(page, a, b, c) {
  var w = INNER / 3;
  text(page, [40, M, 70, M + w], [[a, S.strip]]);
  var mid = text(page, [40, M + w, 70, M + 2 * w], [[b, S.strip]]);
  mid.paragraphs[0].justification = Justification.CENTER_ALIGN;
  var right = text(page, [40, M + 2 * w, 70, W - M], [[c, S.strip]]);
  right.paragraphs[0].justification = Justification.RIGHT_ALIGN;
}

function boldLabels(tf, from, count) {
  for (var i = from; i < from + count; i++) {
    var p = tf.paragraphs[i];
    var tab = p.contents.indexOf("\t");
    if (tab > 0) p.characters.itemByRange(0, tab - 1).appliedCharacterStyle = bold;
  }
}

function addLink(tf, label, url) {
  tf.insertionPoints[-1].contents = "\r" + label;
  var p = tf.paragraphs[-1];
  p.appliedParagraphStyle = S.body;
  p.spaceBefore = 16;
  p.characters.everyItem().appliedCharacterStyle = linkCs;
  var dest = doc.hyperlinkURLDestinations.add(url, { name: label + " (url)" });
  var src = doc.hyperlinkTextSources.add(p.texts[0]);
  doc.hyperlinks.add(src, dest, { name: label });
}

var pageCount = 0;
function newPage() {
  var p = pageCount === 0 ? doc.pages[0] : doc.pages.add(LocationOptions.AT_END);
  p.appliedMaster = master;
  pageCount++;
  return p;
}

// ---------------------------------------------------------------- layouts
var layouts = {
  intro: function (page, s) {
    var colW = (INNER - GAP) / 3;
    photo(page, [TOP, M, 470, M + colW], s.images[0]);
    var paras = [[s.title, S.title]];
    for (var i = 0; i < s.meta.length; i++) paras.push([s.meta[i][0] + "\t" + s.meta[i][1], S.meta]);
    paras.push([s.text, S.body]);
    var tf = text(page, [502, M, BOTTOM, M + colW], paras);
    boldLabels(tf, 1, s.meta.length);
    tf.paragraphs[s.meta.length + 1].spaceBefore = 22;
    tf.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
    photo(page, [TOP, M + colW + GAP, BOTTOM, W - M], s.images[1]);
  },
  triptych: function (page, s) {
    var colW = (INNER - 2 * GAP) / 3;
    for (var i = 0; i < s.columns.length; i++) {
      var x = M + i * (colW + GAP);
      photo(page, [TOP, x, 890, x + colW], s.columns[i]);
      var c = s.columns[i].text;
      var tf = text(page, [914, x, BOTTOM, x + colW], [[c, S.caption]]);
      // First word ("Listen.") in bold
      var dot = c.indexOf(".");
      if (dot > 0 && dot < 20) tf.paragraphs[0].characters.itemByRange(0, dot).appliedCharacterStyle = bold;
    }
  },
  outcome: function (page, s) {
    var bigW = (INNER - GAP) * 2 / 3;
    var x = M + bigW + GAP, colW = INNER - bigW - GAP, half = (colW - 24) / 2;
    photo(page, [TOP, M, BOTTOM, M + bigW], s.image);
    text(page, [TOP, x, TOP + 80, W - M], [[s.heading, S.h2]]);
    for (var i = 0; i < s.figures.length; i++) {
      var fx = x + (i % 2) * (half + 24), fy = 196 + Math.floor(i / 2) * 124;
      text(page, [fy, fx, fy + 112, fx + half], [[s.figures[i][0], S.figure], [s.figures[i][1], S.figureLabel]]);
    }
    var tf = text(page, [452, x, 712, W - M], [[s.text, S.body]]);
    if (s.link) addLink(tf, s.link.text, s.link.url);
    photo(page, [736, x, BOTTOM, W - M], s.side);
  }
};

// ---------------------------------------------------------------- pages
// Cover
var cover = newPage();
strip(cover, "Portfolio", "Valentina Petalosi", "Parsons School of Design · 2027 intake");
var logo = File(HERE.fsName + "/logo-valentina.png");
if (logo.exists) {
  var lr = cover.rectangles.add({ geometricBounds: [390, M, 724, M + 620], strokeColor: NONE, itemLayer: content });
  lr.place(logo);
  lr.fit(FitOptions.PROPORTIONALLY);
  lr.name = "Logo";
}
text(cover, [770, M, BOTTOM, M + 800], [
  ["Selected work", S.cover],
  ["Application to the MS in Strategic Design and Management, Parsons School of Design.", S.lead]
]);
var index = [];
for (var p = 0; p < PROJECTS.length; p++) index.push([PROJECTS[p].name + "\t" + PROJECTS[p].type.split(" · ")[0], S.list]);
var idx = text(cover, [BOTTOM - 180, W - M - 560, BOTTOM, W - M], index);
idx.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
for (var k = 0; k < idx.paragraphs.length; k++) {
  var para = idx.paragraphs[k], t = para.contents.indexOf("\t");
  para.characters.itemByRange(t + 1, para.characters.length - 1).appliedCharacterStyle = softCs;
}

// About
var about = newPage();
strip(about, "About", "Valentina Petalosi", "Bogotá, Colombia");
var half = (INNER - GAP) / 2;
photo(about, [TOP, M, BOTTOM, M + half], { src: "", label: "Portrait or working photo" });
var ab = text(about, [TOP, M + half + GAP, BOTTOM, W - M], [
  ["About me", S.h2],
  ["[Short introduction: background, what you do today, and why strategic design and management is the next step. Four to five sentences.]", S.lead]
]);
ab.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;

// Projects
for (var pi = 0; pi < PROJECTS.length; pi++) {
  var pr = PROJECTS[pi];
  for (var si = 0; si < pr.slides.length; si++) {
    var pg = newPage();
    strip(pg, pr.type, pr.name, pr.role);
    layouts[pr.slides[si].layout](pg, pr.slides[si]);
  }
}

// ---------------------------------------------------------------- finish
doc.layers.itemByName("Placeholder notes (not printed)").move(LocationOptions.AT_BEGINNING);
var out = File(HERE.fsName + "/Portafolio Parsons.indd");
doc.save(out);
doc.windows.add();

var msg = "Portfolio built: " + pageCount + " pages.\nSaved as " + out.fsName;
if (missing.length) msg += "\n\nFonts not found: " + missing.join(", ") +
  ".\nActivate them in Adobe Fonts, then set them in the paragraph styles (Project title, Heading, Figure, Body…).";
alert(msg);
