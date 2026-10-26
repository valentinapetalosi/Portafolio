// Builds the Parsons portfolio in Illustrator: one 1920 × 1080 artboard per page.
//
// How to run: keep this file next to logo-valentina.png, then in Illustrator
// File > Scripts > Other Script… and pick it. It saves "Portafolio Parsons.ai"
// in the same folder. Export with File > Save a Copy > Adobe PDF (all artboards).
//
// Titles use Snaga, text uses Neulis. Photos are read from PHOTOS below
// (`src` is relative to it, e.g. "CANCHA/foto-01.jpg"); an empty `src` leaves
// a named placeholder frame, with a non-printing note saying which photo goes there.

#target illustrator

var HERE = File($.fileName).parent;
var PHOTOS = "F:/MAESTRÍAS/PORTAFOLIO/";

var DOC_FILM = "drive.google.com/file/d/1zyU_mubgoFsIHEC4O8hBdYf_bhJqt2Qz";

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
        link: "Documentary film: " + DOC_FILM,
        side: { src: "", label: "Detail of the painted games" }
      }
    ]
  },
  { name: "Deriva Collection", type: "Brand management · Product design", role: "Founder & creative director · [year]", slides: [] },
  { name: "Ana María Cosméticos", type: "[Project type]", role: "[Role · year]", slides: [] },
  { name: "Jacarandas", type: "[Project type]", role: "[Role · year]", slides: [] }
];

// ---------------------------------------------------------------- geometry (px, measured down from the artboard's top-left)
var W = 1920, H = 1080, M = 72, GAP = 32;
var TOP = 100, BOTTOM = 1008;
var INNER = W - 2 * M;

// ---------------------------------------------------------------- fonts
var missing = [];
var FONTS = [];
for (var fi = 0; fi < app.textFonts.length; fi++) {
  var tfnt = app.textFonts[fi];
  FONTS.push({ family: String(tfnt.family).toLowerCase(), style: String(tfnt.style), font: tfnt });
}

function findFont(hints, styles, label) {
  for (var h = 0; h < hints.length; h++) {
    for (var s = 0; s < styles.length; s++) {
      for (var i = 0; i < FONTS.length; i++) {
        if (FONTS[i].family === hints[h].toLowerCase() && FONTS[i].style === styles[s]) return FONTS[i].font;
      }
    }
  }
  for (var j = 0; j < FONTS.length; j++) {
    if (FONTS[j].family.indexOf(hints[0].toLowerCase()) !== -1) return FONTS[j].font;
  }
  missing.push(label);
  return null;
}

var TITLE_FONT = findFont(["Snaga"], ["Regular", "Medium", "Bold"], "Snaga");
var TEXT_FONT = findFont(["Neulis Sans", "Neulis Neue", "Neulis"], ["Regular", "Light", "Medium"], "Neulis (regular)");
var TEXT_BOLD = findFont(["Neulis Sans", "Neulis Neue", "Neulis"], ["SemiBold", "Semibold", "Bold", "Medium"], "Neulis (bold)");

// ---------------------------------------------------------------- document
var pageTotal = 2;
for (var c = 0; c < PROJECTS.length; c++) pageTotal += PROJECTS[c].slides.length;

app.coordinateSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM;
var doc = app.documents.add(DocumentColorSpace.RGB, W, H, pageTotal, DocumentArtboardLayout.Column, 120, 1);

function swatch(name, r, g, b) {
  var col = new RGBColor();
  col.red = r; col.green = g; col.blue = b;
  var sw = doc.swatches.add();
  sw.name = name;
  sw.color = col;
  return col;
}
var IVORY = swatch("Ivory", 246, 241, 231);
var INK = swatch("Ink", 26, 24, 20);
var SOFT = swatch("Soft", 107, 101, 90);
var TONE = swatch("Photo frame", 233, 226, 212);

var content = doc.layers[0];
content.name = "Portfolio";
var bgLayer = doc.layers.add();
bgLayer.name = "Background";
bgLayer.move(content, ElementPlacement.PLACEAFTER);
var notes = doc.layers.add();
notes.name = "Placeholder notes (not printed)";
notes.printable = false;

// ---------------------------------------------------------------- styles
function pStyle(name, font, size, leading, color) {
  var st = doc.paragraphStyles.add(name);
  var ca = st.characterAttributes;
  if (font) ca.textFont = font;
  ca.size = size;
  ca.autoLeading = false;
  ca.leading = leading;
  ca.fillColor = color || INK;
  st.paragraphAttributes.hyphenation = false;
  return st;
}
// Three sizes do all the work: 96 display, 56 heading, 20 text.
var S = {
  strip: pStyle("Strip", TEXT_BOLD, 20, 24),
  display: pStyle("Display", TITLE_FONT, 96, 100),
  h2: pStyle("Heading", TITLE_FONT, 56, 60),
  body: pStyle("Body", TEXT_FONT, 20, 30),
  meta: pStyle("Meta", TEXT_FONT, 20, 28),
  metaLabel: pStyle("Meta label", TEXT_BOLD, 20, 28),
  caption: pStyle("Caption", TEXT_FONT, 20, 30),
  figure: pStyle("Figure", TITLE_FONT, 56, 60),
  figureLabel: pStyle("Figure label", TEXT_FONT, 20, 28),
  list: pStyle("Index", TEXT_FONT, 20, 38),
  listSoft: pStyle("Index soft", TEXT_FONT, 20, 38, SOFT),
  note: pStyle("Placeholder note", TEXT_FONT, 20, 26, SOFT)
};

// ---------------------------------------------------------------- helpers
var AB; // current artboard rect [left, top, right, bottom]
function X(x) { return AB[0] + x; }
function Y(y) { return AB[1] - y; }

function rect(layer, top, left, bottom, right, fill) {
  var r = layer.pathItems.rectangle(Y(top), X(left), right - left, bottom - top);
  r.stroked = false;
  if (fill) { r.filled = true; r.fillColor = fill; } else { r.filled = false; }
  return r;
}

// paras: array of [text, style]; align: "left" | "center" | "right"
function text(top, left, bottom, right, paras, align, layer) {
  var box = rect(layer || content, top, left, bottom, right, null);
  var tf = (layer || content).textFrames.areaText(box);
  var lines = [];
  for (var i = 0; i < paras.length; i++) lines.push(paras[i][0]);
  tf.contents = lines.join("\r");
  for (var j = 0; j < paras.length; j++) {
    var p = tf.paragraphs[j];
    paras[j][1].applyTo(p, true);
    if (align === "center") p.paragraphAttributes.justification = Justification.CENTER;
    if (align === "right") p.paragraphAttributes.justification = Justification.RIGHT;
  }
  return tf;
}

function photo(top, left, bottom, right, im) {
  var frame = rect(content, top, left, bottom, right, TONE);
  frame.name = "Photo: " + (im.label || "image");
  var f = im.src ? File(PHOTOS + im.src) : null;
  if (f && f.exists) {
    var g = content.groupItems.add();
    g.name = frame.name;
    var pic = g.placedItems.add();
    pic.file = f;
    var w = right - left, h = bottom - top;
    var k = Math.max(w / pic.width, h / pic.height);
    pic.width *= k; pic.height *= k;
    pic.position = [X(left) - (pic.width - w) / 2, Y(top) + (pic.height - h) / 2];
    frame.move(g, ElementPlacement.PLACEATBEGINNING);
    g.clipped = true;
    return g;
  }
  var mid = (top + bottom) / 2;
  text(mid - 16, left + 20, mid + 24, right - 20, [[im.label || "Photo", S.note]], "center", notes);
  return frame;
}

function strip(a, b, c) {
  var w = INNER / 3;
  text(40, M, 72, M + w, [[a, S.strip]]);
  text(40, M + w, 72, M + 2 * w, [[b, S.strip]], "center");
  text(40, M + 2 * w, 72, W - M, [[c, S.strip]], "right");
}

var page = -1;
function newPage(name) {
  page++;
  doc.artboards[page].name = name;
  AB = doc.artboards[page].artboardRect;
  rect(bgLayer, 0, 0, H, W, IVORY);
}

// ---------------------------------------------------------------- layouts
var layouts = {
  intro: function (s) {
    var colW = (INNER - GAP) / 3;
    photo(TOP, M, 440, M + colW, s.images[0]);
    text(470, M, 580, M + colW, [[s.title, S.display]]);
    var labels = [], values = [];
    for (var i = 0; i < s.meta.length; i++) {
      labels.push([s.meta[i][0], S.metaLabel]);
      values.push([s.meta[i][1], S.meta]);
    }
    var metaBottom = 600 + s.meta.length * 28 + 8;
    text(600, M, metaBottom, M + 120, labels);
    text(600, M + 130, metaBottom, M + colW, values);
    text(metaBottom + 22, M, BOTTOM, M + colW, [[s.text, S.body]]);
    photo(TOP, M + colW + GAP, BOTTOM, W - M, s.images[1]);
  },
  triptych: function (s) {
    var colW = (INNER - 2 * GAP) / 3;
    for (var i = 0; i < s.columns.length; i++) {
      var x = M + i * (colW + GAP);
      photo(TOP, x, 890, x + colW, s.columns[i]);
      var tf = text(914, x, BOTTOM, x + colW, [[s.columns[i].text, S.caption]]);
      if (TEXT_BOLD) tf.paragraphs[0].words[0].characterAttributes.textFont = TEXT_BOLD;
    }
  },
  outcome: function (s) {
    var bigW = (INNER - GAP) * 2 / 3;
    var x = M + bigW + GAP, colW = INNER - bigW - GAP, half = (colW - 24) / 2;
    photo(TOP, M, BOTTOM, M + bigW, s.image);
    text(TOP, x, TOP + 70, W - M, [[s.heading, S.h2]]);
    for (var i = 0; i < s.figures.length; i++) {
      var fx = x + (i % 2) * (half + 24), fy = 190 + Math.floor(i / 2) * 140;
      text(fy, fx, fy + 124, fx + half, [[s.figures[i][0], S.figure], [s.figures[i][1], S.figureLabel]]);
    }
    var paras = [[s.text, S.body]];
    if (s.link) paras.push([s.link, S.figureLabel]);
    var tf = text(476, x, 736, W - M, paras);
    if (s.link) tf.paragraphs[1].paragraphAttributes.spaceBefore = 16;
    photo(760, x, BOTTOM, W - M, s.side);
  }
};

// ---------------------------------------------------------------- pages
newPage("Cover");
strip("Portfolio", "Valentina Petalosi", "Parsons School of Design · 2027 intake");
var coverL = (INNER - GAP) / 2.25;
var logo = File(HERE.fsName + "/logo-valentina.png");
if (logo.exists) {
  var lg = content.placedItems.add();
  lg.file = logo;
  var ratio = 520 / lg.width;
  lg.width *= ratio; lg.height *= ratio;
  lg.position = [X(M), Y(TOP)];
  lg.name = "Logo";
}
text(596, M, 704, M + coverL, [["Selected work", S.display]]);
text(724, M, 800, M + 640, [["Application to the MS in Strategic Design and Management, Parsons School of Design.", S.body]]);
var names = [], types = [];
for (var p = 0; p < PROJECTS.length; p++) {
  names.push([PROJECTS[p].name, S.list]);
  types.push([PROJECTS[p].type.split(" · ")[0], S.listSoft]);
}
var listTop = BOTTOM - PROJECTS.length * 38 - 8;
text(listTop, M, BOTTOM, M + 400, names);
text(listTop, M + 340, BOTTOM, M + 640, types, "right");
photo(TOP, M + coverL + GAP, BOTTOM, W - M, { src: "", label: "Cover photo: Rayuela, drone view of the finished court" });

newPage("About");
strip("About", "Valentina Petalosi", "Bogotá, Colombia");
var halfW = (INNER - GAP) / 2;
photo(TOP, M, BOTTOM, M + halfW, { src: "", label: "Portrait or working photo" });
text(700, M + halfW + GAP, 780, W - M, [["About me", S.h2]]);
text(800, M + halfW + GAP, BOTTOM, W - M, [["[Short introduction: background, what you do today, and why strategic design and management is the next step. Four to five sentences.]", S.body]]);

for (var pi = 0; pi < PROJECTS.length; pi++) {
  var pr = PROJECTS[pi];
  for (var si = 0; si < pr.slides.length; si++) {
    newPage(pr.name + " " + (si + 1));
    strip(pr.type, pr.name, pr.role);
    layouts[pr.slides[si].layout](pr.slides[si]);
  }
}

// ---------------------------------------------------------------- finish
bgLayer.locked = true;
var out = File(HERE.fsName + "/Portafolio Parsons.ai");
doc.saveAs(out);

var msg = "Portfolio built: " + pageTotal + " artboards.\nSaved as " + out.fsName;
if (missing.length) msg += "\n\nFonts not found: " + missing.join(", ") +
  ".\nActivate them in Adobe Fonts, then set them in the paragraph styles (Window > Type > Paragraph Styles).";
alert(msg);
