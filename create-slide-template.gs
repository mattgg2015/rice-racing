/**
 * Rice Racing - Google Slides Template Generator
 * VERSION 6 - ADDED AGENDA, VEHICLE SYSTEMS & TIMELINE SLIDES
 *
 * New in v6:
 * - Agenda slide: Minimalistic numbered list with gold accents
 * - Vehicle Systems slide: 6-column layout (Suspension, Chassis, Controls, Aero, Powertrain, Electrical)
 * - Timeline slide: Multi-year Gantt chart for Car 1 & Car 2 development cycles
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire script
 * 4. Click Run > createRiceRacingTemplate
 * 5. Authorize when prompted
 * 6. Check your Google Drive for "Rice Racing - Presentation Template"
 */

// Brand colors - Soft, readable palette with warmth
const COLORS = {
  background: '#F5F8FC',      // Soft blue-tinted white (easy on eyes)
  primary: '#002451',         // Logo navy for headings
  secondary: '#4A6D8C',       // Softer blue for body text (not gray)
  accent: '#FFC94A',          // Gold for dividers and highlights
  cornerAccent: '#7A9BBF',    // Light blue for corner brackets
  mutedBlue: '#8EACC4',       // Muted blue for subtle elements
  checkeredDark: '#002451',   // Logo navy for dark squares
  checkeredLight: '#F5F8FC'   // Matches background for light squares
};

function createRiceRacingTemplate() {
  // Create a new presentation
  const presentation = SlidesApp.create('Rice Racing - Presentation Template');

  // Get default slide and remove it later
  const slides = presentation.getSlides();

  // Set up slide dimensions (16:9 widescreen)
  // Note: Google Slides API doesn't allow changing dimensions after creation
  // Default is already 16:9 (10" x 5.625")

  // Create Title Slide
  createTitleSlide(presentation);

  // Create Content Slide
  createContentSlide(presentation);

  // Create Section Header Slide
  createSectionSlide(presentation);

  // Create Two-Column Slide
  createTwoColumnSlide(presentation);

  // Create Agenda Slide
  createAgendaSlide(presentation);

  // Create Vehicle System Overview Slide
  createVehicleSystemSlide(presentation);

  // Create Timeline Slide
  createTimelineSlide(presentation);

  // Remove the default blank slide
  if (slides.length > 0) {
    slides[0].remove();
  }

  Logger.log('Template created successfully!');
  Logger.log('Find it in your Google Drive: "Rice Racing - Presentation Template"');

  return presentation;
}

function createTitleSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background to white
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered racing stripe at bottom
  addCheckeredStripe(slide);

  // Add logo placeholder text (top-left)
  const logoPlaceholder = slide.insertTextBox('[ RICE RACING LOGO ]', 40, 30, 200, 40);
  logoPlaceholder.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(10)
    .setForegroundColor(COLORS.mutedBlue);

  // Add main title
  const title = slide.insertTextBox('PRESENTATION TITLE', 40, 160, 640, 80);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(54)
    .setBold(true)
    .setForegroundColor(COLORS.primary);
  title.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);

  // Add subtitle
  const subtitle = slide.insertTextBox('Subtitle or Date Goes Here', 40, 250, 640, 40);
  subtitle.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(20)
    .setForegroundColor(COLORS.secondary);

  // Add decorative corner brackets (top corners only - bottom has checkered stripe)
  addCornerBracket(slide, 40, 30, 'top-left');
  addCornerBracket(slide, 660, 30, 'top-right');
}

function createContentSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered stripe
  addCheckeredStripe(slide);

  // Add logo placeholder (top-left, smaller)
  const logoPlaceholder = slide.insertTextBox('[ LOGO ]', 40, 20, 80, 25);
  logoPlaceholder.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.mutedBlue);

  // Add slide title
  const title = slide.insertTextBox('SLIDE TITLE', 40, 60, 640, 50);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(36)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Add horizontal divider line
  const divider = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    40, 115, 200, 115
  );
  divider.getLineFill().setSolidFill(COLORS.accent);
  divider.setWeight(2);

  // Add content area
  const content = slide.insertTextBox(
    '• First bullet point goes here\n• Second bullet point goes here\n• Third bullet point goes here',
    40, 135, 400, 180
  );
  content.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(18)
    .setForegroundColor(COLORS.secondary);
  content.getText().getParagraphStyle().setLineSpacing(150);
}

function createSectionSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered stripe
  addCheckeredStripe(slide);

  // Add section number
  const sectionNum = slide.insertTextBox('01', 40, 140, 100, 60);
  sectionNum.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(48)
    .setBold(true)
    .setForegroundColor(COLORS.accent);

  // Add section title
  const title = slide.insertTextBox('SECTION TITLE', 150, 150, 500, 50);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(42)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Add decorative line
  const line = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    150, 205, 400, 205
  );
  line.getLineFill().setSolidFill(COLORS.accent);
  line.setWeight(1);

  // Add corner brackets (top corners only - bottom has checkered stripe)
  addCornerBracket(slide, 40, 30, 'top-left');
  addCornerBracket(slide, 660, 30, 'top-right');
}

function createTwoColumnSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered stripe
  addCheckeredStripe(slide);

  // Add logo placeholder
  const logoPlaceholder = slide.insertTextBox('[ LOGO ]', 40, 20, 80, 25);
  logoPlaceholder.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.mutedBlue);

  // Add slide title
  const title = slide.insertTextBox('TWO COLUMN LAYOUT', 40, 60, 640, 50);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(36)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Add divider
  const divider = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    40, 115, 200, 115
  );
  divider.getLineFill().setSolidFill(COLORS.accent);
  divider.setWeight(2);

  // Left column
  const leftCol = slide.insertTextBox(
    'LEFT COLUMN\n\n• Point one\n• Point two\n• Point three',
    40, 135, 300, 180
  );
  leftCol.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(16)
    .setForegroundColor(COLORS.secondary);

  // Make header bold
  leftCol.getText().getRange(0, 11).getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(18)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Vertical divider
  const vertDivider = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    360, 135, 360, 300
  );
  vertDivider.getLineFill().setSolidFill(COLORS.mutedBlue);
  vertDivider.setWeight(1);

  // Right column
  const rightCol = slide.insertTextBox(
    'RIGHT COLUMN\n\n• Point one\n• Point two\n• Point three',
    380, 135, 300, 180
  );
  rightCol.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(16)
    .setForegroundColor(COLORS.secondary);

  // Make header bold
  rightCol.getText().getRange(0, 12).getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(18)
    .setBold(true)
    .setForegroundColor(COLORS.primary);
}

function createAgendaSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered stripe
  addCheckeredStripe(slide);

  // Add logo placeholder
  const logoPlaceholder = slide.insertTextBox('[ LOGO ]', 40, 20, 80, 25);
  logoPlaceholder.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.mutedBlue);

  // Add slide title
  const title = slide.insertTextBox('AGENDA', 40, 55, 300, 45);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(32)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Add short gold accent line under title
  const divider = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    40, 100, 120, 100
  );
  divider.getLineFill().setSolidFill(COLORS.accent);
  divider.setWeight(2);

  // Agenda items - clean numbered list with dots
  const agendaItems = [
    { num: '01', text: 'Team Introduction' },
    { num: '02', text: 'Vehicle Overview' },
    { num: '03', text: 'Design Highlights' },
    { num: '04', text: 'Project Timeline' },
    { num: '05', text: 'Q&A' }
  ];

  const startY = 125;
  const itemHeight = 45;

  agendaItems.forEach((item, index) => {
    const y = startY + (index * itemHeight);

    // Number in gold
    const numBox = slide.insertTextBox(item.num, 50, y, 40, 30);
    numBox.getText().getTextStyle()
      .setFontFamily('Oswald')
      .setFontSize(18)
      .setBold(true)
      .setForegroundColor(COLORS.accent);

    // Small dot separator
    const dot = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, 95, y + 10, 6, 6);
    dot.getFill().setSolidFill(COLORS.mutedBlue);
    dot.getBorder().setTransparent();

    // Item text
    const textBox = slide.insertTextBox(item.text, 115, y, 300, 30);
    textBox.getText().getTextStyle()
      .setFontFamily('Roboto')
      .setFontSize(16)
      .setForegroundColor(COLORS.secondary);
  });

  // Decorative vertical line on right side
  const vertLine = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    620, 80, 620, 320
  );
  vertLine.getLineFill().setSolidFill(COLORS.mutedBlue);
  vertLine.setWeight(1);

  // Add corner brackets
  addCornerBracket(slide, 40, 30, 'top-left');
  addCornerBracket(slide, 660, 30, 'top-right');
}

function createVehicleSystemSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered stripe
  addCheckeredStripe(slide);

  // Add logo placeholder
  const logoPlaceholder = slide.insertTextBox('[ LOGO ]', 40, 20, 80, 25);
  logoPlaceholder.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.mutedBlue);

  // Add slide title
  const title = slide.insertTextBox('VEHICLE SYSTEMS', 40, 50, 400, 40);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(28)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Add divider
  const divider = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    40, 90, 140, 90
  );
  divider.getLineFill().setSolidFill(COLORS.accent);
  divider.setWeight(2);

  // Column definitions: title and number of blocks
  const columns = [
    { title: 'SUSPENSION', blocks: 1 },
    { title: 'CHASSIS', blocks: 2 },
    { title: 'CONTROLS', blocks: 4 },
    { title: 'AERO', blocks: 3 },
    { title: 'POWERTRAIN', blocks: 4 },
    { title: 'ELECTRICAL', blocks: 4 }
  ];

  const startX = 40;
  const colWidth = 105;
  const colGap = 5;
  const headerY = 110;
  const blockStartY = 145;
  const blockHeight = 40;
  const blockGap = 5;

  columns.forEach((col, colIndex) => {
    const x = startX + (colIndex * (colWidth + colGap));

    // Column header with navy background
    const headerBg = slide.insertShape(
      SlidesApp.ShapeType.RECTANGLE,
      x, headerY, colWidth, 28
    );
    headerBg.getFill().setSolidFill(COLORS.primary);
    headerBg.getBorder().setTransparent();

    // Header text
    const headerText = slide.insertTextBox(col.title, x, headerY + 5, colWidth, 20);
    headerText.getText().getTextStyle()
      .setFontFamily('Oswald')
      .setFontSize(9)
      .setBold(true)
      .setForegroundColor('#FFFFFF');
    headerText.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

    // Add blocks
    for (let i = 0; i < col.blocks; i++) {
      const blockY = blockStartY + (i * (blockHeight + blockGap));

      // Block rectangle with light fill
      const block = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        x, blockY, colWidth, blockHeight
      );
      block.getFill().setSolidFill('#E8EEF4');
      block.getBorder().getLineFill().setSolidFill(COLORS.mutedBlue);
      block.getBorder().setWeight(1);

      // Placeholder text
      const blockText = slide.insertTextBox('Subsystem', x + 5, blockY + 12, colWidth - 10, 20);
      blockText.getText().getTextStyle()
        .setFontFamily('Roboto')
        .setFontSize(9)
        .setForegroundColor(COLORS.secondary);
      blockText.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
  });
}

function createTimelineSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  // Set background
  slide.getBackground().setSolidFill(COLORS.background);

  // Add checkered stripe
  addCheckeredStripe(slide);

  // Add logo placeholder
  const logoPlaceholder = slide.insertTextBox('[ LOGO ]', 40, 15, 80, 20);
  logoPlaceholder.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.mutedBlue);

  // Add slide title
  const title = slide.insertTextBox('PROJECT TIMELINE', 40, 35, 300, 35);
  title.getText().getTextStyle()
    .setFontFamily('Oswald')
    .setFontSize(24)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Add divider
  const divider = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    40, 68, 130, 68
  );
  divider.getLineFill().setSolidFill(COLORS.accent);
  divider.setWeight(2);

  // Timeline configuration
  const years = ['2026', '2027', '2028'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const timelineStartX = 120;
  const timelineWidth = 560;
  const yearBlockWidth = timelineWidth / 3;
  const monthWidth = yearBlockWidth / 12;
  const rowHeight = 22;

  let currentY = 80;

  // Car 1 and Car 2 tasks per year
  const timeline = {
    '2026': {
      car1: [
        { start: 0, end: 1, label: 'Onboarding', color: '#B8C5D3' },
        { start: 1, end: 8, label: 'Design', color: '#B8C5D3' },
        { start: 8, end: 10, label: 'Check rules - Redesign', color: '#B8C5D3' },
        { start: 10, end: 12, label: 'Manufacturing', color: '#B8C5D3' }
      ],
      car2: []
    },
    '2027': {
      car1: [
        { start: 0, end: 2, label: 'Manufacturing', color: '#B8C5D3' },
        { start: 2, end: 4, label: 'Testing', color: '#B8C5D3' },
        { start: 4, end: 5, label: 'COMPETITION', color: COLORS.accent }
      ],
      car2: [
        { start: 0, end: 8, label: 'Design', color: '#B8C5D3' },
        { start: 8, end: 10, label: 'Check rules - Redesign', color: '#B8C5D3' },
        { start: 10, end: 12, label: 'Manufacturing', color: '#B8C5D3' }
      ]
    },
    '2028': {
      car1: [],
      car2: [
        { start: 0, end: 2, label: 'Manufacturing', color: '#B8C5D3' },
        { start: 2, end: 4, label: 'Testing', color: '#B8C5D3' },
        { start: 4, end: 5, label: 'COMPETITION', color: COLORS.accent }
      ]
    }
  };

  years.forEach((year, yearIndex) => {
    const yearX = timelineStartX + (yearIndex * yearBlockWidth);

    // Year header
    const yearHeader = slide.insertShape(
      SlidesApp.ShapeType.RECTANGLE,
      yearX, currentY, yearBlockWidth, 20
    );
    yearHeader.getFill().setSolidFill(COLORS.primary);
    yearHeader.getBorder().setTransparent();

    const yearText = slide.insertTextBox(year, yearX, currentY + 3, yearBlockWidth, 16);
    yearText.getText().getTextStyle()
      .setFontFamily('Oswald')
      .setFontSize(12)
      .setBold(true)
      .setForegroundColor('#FFFFFF');
    yearText.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

    // Month labels
    const monthY = currentY + 22;
    months.forEach((month, monthIndex) => {
      const monthX = yearX + (monthIndex * monthWidth);
      const monthText = slide.insertTextBox(month.substring(0, 1), monthX, monthY, monthWidth, 12);
      monthText.getText().getTextStyle()
        .setFontFamily('Roboto')
        .setFontSize(6)
        .setForegroundColor(COLORS.secondary);
      monthText.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    });
  });

  // Row labels
  const labelX = 35;
  const car1Y = currentY + 55;
  const car2Y = currentY + 80;

  const car1Label = slide.insertTextBox('Car 1\n(Michigan 27)', labelX, car1Y, 80, 24);
  car1Label.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(7)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  const car2Label = slide.insertTextBox('Car 2\n(Michigan 28)', labelX, car2Y, 80, 24);
  car2Label.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(7)
    .setBold(true)
    .setForegroundColor(COLORS.primary);

  // Draw timeline bars
  years.forEach((year, yearIndex) => {
    const yearX = timelineStartX + (yearIndex * yearBlockWidth);
    const yearData = timeline[year];

    // Car 1 bars
    yearData.car1.forEach(task => {
      const barX = yearX + (task.start * monthWidth);
      const barWidth = (task.end - task.start) * monthWidth;

      const bar = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        barX, currentY + 55, barWidth, rowHeight
      );
      bar.getFill().setSolidFill(task.color);
      bar.getBorder().setTransparent();

      // Task label
      if (barWidth > 30) {
        const taskText = slide.insertTextBox(task.label, barX + 2, currentY + 60, barWidth - 4, 14);
        taskText.getText().getTextStyle()
          .setFontFamily('Roboto')
          .setFontSize(6)
          .setForegroundColor(task.color === COLORS.accent ? COLORS.primary : '#FFFFFF');
        taskText.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
      }
    });

    // Car 2 bars
    yearData.car2.forEach(task => {
      const barX = yearX + (task.start * monthWidth);
      const barWidth = (task.end - task.start) * monthWidth;

      const bar = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        barX, currentY + 80, barWidth, rowHeight
      );
      bar.getFill().setSolidFill(task.color);
      bar.getBorder().setTransparent();

      // Task label
      if (barWidth > 30) {
        const taskText = slide.insertTextBox(task.label, barX + 2, currentY + 85, barWidth - 4, 14);
        taskText.getText().getTextStyle()
          .setFontFamily('Roboto')
          .setFontSize(6)
          .setForegroundColor(task.color === COLORS.accent ? COLORS.primary : '#FFFFFF');
        taskText.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
      }
    });
  });

  // Add legend
  const legendY = currentY + 115;

  // Design/Manufacturing bar
  const legendBar1 = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, timelineStartX, legendY, 50, 12);
  legendBar1.getFill().setSolidFill('#B8C5D3');
  legendBar1.getBorder().setTransparent();

  const legendText1 = slide.insertTextBox('Design / Manufacturing / Testing', timelineStartX + 55, legendY, 150, 14);
  legendText1.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.secondary);

  // Competition bar
  const legendBar2 = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, timelineStartX + 220, legendY, 50, 12);
  legendBar2.getFill().setSolidFill(COLORS.accent);
  legendBar2.getBorder().setTransparent();

  const legendText2 = slide.insertTextBox('Competition', timelineStartX + 275, legendY, 80, 14);
  legendText2.getText().getTextStyle()
    .setFontFamily('Roboto')
    .setFontSize(8)
    .setForegroundColor(COLORS.secondary);
}

function addCheckeredStripe(slide) {
  // Classic racing checkered flag pattern - 2 rows, alternating squares

  const squareSize = 10;  // Each square is 10x10 points
  const slideWidth = 720;  // Standard slide width in points
  const stripeY = 390 - (squareSize * 2);  // Position so bottom of stripe is near slide bottom

  const numColumns = Math.ceil(slideWidth / squareSize);

  // Create 2 rows of alternating squares
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < numColumns; col++) {
      const x = col * squareSize;
      const y = stripeY + (row * squareSize);

      // Classic checkerboard: (row + col) % 2 determines color
      // When row+col is even = one color, when odd = other color
      const isDark = (row + col) % 2 === 0;

      const square = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        x, y, squareSize, squareSize
      );

      square.getFill().setSolidFill(isDark ? COLORS.checkeredDark : COLORS.checkeredLight);
      square.getBorder().setTransparent();
    }
  }
}

function addCornerBracket(slide, x, y, position) {
  // Add decorative corner brackets (L-shaped)
  const size = 30;
  const weight = 1;

  let hLineStart, hLineEnd, vLineStart, vLineEnd;

  switch(position) {
    case 'top-right':
      // Horizontal line going left
      hLineStart = {x: x + size, y: y};
      hLineEnd = {x: x, y: y};
      // Vertical line going down
      vLineStart = {x: x + size, y: y};
      vLineEnd = {x: x + size, y: y + size};
      break;
    case 'bottom-left':
      // Horizontal line going right
      hLineStart = {x: x, y: y + size};
      hLineEnd = {x: x + size, y: y + size};
      // Vertical line going up
      vLineStart = {x: x, y: y + size};
      vLineEnd = {x: x, y: y};
      break;
    case 'top-left':
      hLineStart = {x: x, y: y};
      hLineEnd = {x: x + size, y: y};
      vLineStart = {x: x, y: y};
      vLineEnd = {x: x, y: y + size};
      break;
    case 'bottom-right':
      hLineStart = {x: x + size, y: y + size};
      hLineEnd = {x: x, y: y + size};
      vLineStart = {x: x + size, y: y + size};
      vLineEnd = {x: x + size, y: y};
      break;
  }

  const hLine = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    hLineStart.x, hLineStart.y, hLineEnd.x, hLineEnd.y
  );
  hLine.getLineFill().setSolidFill(COLORS.cornerAccent);
  hLine.setWeight(weight);

  const vLine = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    vLineStart.x, vLineStart.y, vLineEnd.x, vLineEnd.y
  );
  vLine.getLineFill().setSolidFill(COLORS.cornerAccent);
  vLine.setWeight(weight);
}

/**
 * Optional: Run this to add your logo image to all slides
 * You'll need to upload your logo to Google Drive first and get the file ID
 *
 * Usage: addLogoToAllSlides('YOUR_LOGO_FILE_ID_HERE')
 */
function addLogoToAllSlides(logoFileId) {
  const presentation = SlidesApp.getActivePresentation();
  const slides = presentation.getSlides();

  const logoBlob = DriveApp.getFileById(logoFileId).getBlob();

  slides.forEach(slide => {
    // Remove placeholder text boxes that say "LOGO"
    slide.getShapes().forEach(shape => {
      if (shape.getText && shape.getText().asString().includes('LOGO')) {
        const left = shape.getLeft();
        const top = shape.getTop();
        shape.remove();

        // Add actual logo image
        const logo = slide.insertImage(logoBlob, left, top, 80, 40);
      }
    });
  });
}
