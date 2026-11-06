


export function boardMarkup() {
  return `
  <svg class="anatomy__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" focusable="false">
    <defs>
      <linearGradient id="anatomy-board-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--anatomy-board-1)"></stop>
        <stop offset="1" stop-color="var(--anatomy-board-2)"></stop>
      </linearGradient>
      <linearGradient id="anatomy-metal-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--anatomy-metal-1)"></stop>
        <stop offset="1" stop-color="var(--anatomy-metal-2)"></stop>
      </linearGradient>
      <pattern id="anatomy-grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" class="anatomy__grid-line"></path>
      </pattern>
    </defs>

    <rect class="anatomy__board-bg" x="16" y="16" width="968" height="608" rx="16"></rect>
    <rect class="anatomy__board-grid" x="16" y="16" width="968" height="608" rx="16" fill="url(#anatomy-grid)"></rect>
    <rect class="anatomy__board-edge" x="29" y="29" width="942" height="582" rx="10"></rect>

    <g class="anatomy__mounts" aria-hidden="true">
      <circle cx="48" cy="48" r="7"></circle>
      <circle cx="952" cy="48" r="7"></circle>
      <circle cx="48" cy="592" r="7"></circle>
      <circle cx="952" cy="592" r="7"></circle>
      <path d="M43 48h10M48 43v10M947 48h10M952 43v10M43 592h10M48 587v10M947 592h10M952 587v10"></path>
    </g>

    <g class="anatomy__traces" aria-hidden="true">
      <path d="M122 92H168V128"></path>
      <path d="M376 232H438"></path>
      <path d="M376 300H410V340H432"></path>
      <path d="M410 152V188H430"></path>
      <path d="M634 232H700V300H742"></path>
      <path d="M714 440H742"></path>
      <path d="M598 440H574V476H562"></path>
      <path d="M600 492V552H540"></path>
      <path d="M758 250V278H742"></path>
      <path d="M286 322V344"></path>
      <path d="M630 384V360H660"></path>
    </g>

    <g class="anatomy__caps" aria-hidden="true">
      <circle cx="410" cy="176" r="5"></circle>
      <circle cx="410" cy="198" r="5"></circle>
      <circle cx="410" cy="220" r="5"></circle>
      <circle cx="660" cy="344" r="5"></circle>
      <circle cx="682" cy="344" r="5"></circle>
    </g>

    <text class="anatomy__silkscreen" x="176" y="58">ITC-01 / MAINBOARD</text>
    <text class="anatomy__silkscreen anatomy__silkscreen--end" x="954" y="606" text-anchor="end">REV 02</text>

    <!-- Data links -->
    <g class="anatomy__links" aria-hidden="true">
      <path id="anatomy-link-cpu-ram" class="anatomy__link" data-link data-a="cpu" data-b="ram" data-tone="blue" d="M382 232H462"></path>
      <path id="anatomy-link-cpu-gpu" class="anatomy__link" data-link data-a="cpu" data-b="gpu" data-tone="purple" d="M368 322V394"></path>
      <path id="anatomy-link-cpu-mobo" class="anatomy__link" data-link data-a="cpu" data-b="motherboard" data-tone="cyan" d="M376 310C470 345 560 365 630 384"></path>
      <path id="anatomy-link-mobo-storage" class="anatomy__link" data-link data-a="motherboard" data-b="storage" data-tone="green" d="M714 440H770"></path>
      <path id="anatomy-link-power-mobo" class="anatomy__link" data-link data-a="power" data-b="motherboard" data-tone="amber" d="M758 204C736 280 700 340 690 384"></path>
      <path id="anatomy-link-io-mobo" class="anatomy__link" data-link data-a="io" data-b="motherboard" data-tone="blue" d="M122 362C122 560 500 585 620 530C640 518 650 505 658 492"></path>
      <path id="anatomy-link-gpu-io" class="anatomy__link" data-link data-a="gpu" data-b="io" data-tone="purple" d="M112 452C72 452 72 400 84 362"></path>
      <path id="anatomy-link-power-cpu" class="anatomy__link anatomy__link--power" data-link data-a="power" data-b="cpu" data-tone="amber" d="M758 132C650 42 470 54 372 142"></path>
      <path id="anatomy-link-power-gpu" class="anatomy__link anatomy__link--power" data-link data-a="power" data-b="gpu" data-tone="amber" d="M758 220C700 300 650 388 562 418"></path>
      <path id="anatomy-link-power-storage" class="anatomy__link anatomy__link--power" data-link data-a="power" data-b="storage" data-tone="amber" d="M850 240V270C850 282 855 288 855 306"></path>
      <path id="anatomy-link-gpu-display" class="anatomy__link anatomy__link--video" data-link data-a="gpu" data-b="io" data-tone="purple" d="M118 480C48 500 30 410 42 340"></path>
    </g>

    <g class="anatomy__particles" data-particle-layer aria-hidden="true"></g>

    <!-- 01 CPU -->
    <g class="anatomy__part" data-part="cpu" tabindex="0" role="button" aria-label="Sélectionner : Processeur" aria-pressed="false">
      <rect class="anatomy__hit" x="186" y="132" width="198" height="198" rx="8"></rect>
      <rect class="anatomy__metal" x="194" y="140" width="182" height="182" rx="6"></rect>
      <rect class="anatomy__part-deep" x="206" y="152" width="158" height="158" rx="3"></rect>
      <g class="anatomy__pins">
        <path d="M198 164H188M198 184H188M198 204H188M198 224H188M198 244H188M198 264H188M198 284H188M198 304H188"></path>
        <path d="M372 164H382M372 184H382M372 204H382M372 224H382M372 244H382M372 264H382M372 284H382M372 304H382"></path>
        <path d="M220 144V134M244 144V134M268 144V134M292 144V134M316 144V134M340 144V134M220 318V328M244 318V328M268 318V328M292 318V328M316 318V328M340 318V328"></path>
      </g>
      <rect class="anatomy__die" x="252" y="197" width="66" height="66" rx="2"></rect>
      <path class="anatomy__die-core" d="M262 207h46v46h-46z"></path>
      <rect class="anatomy__fan-ring" x="233" y="179" width="104" height="104" rx="14"></rect>
      <g class="anatomy__fan">
        <path d="M285 208v-18"></path>
        <path d="M285 208v-18" transform="rotate(90 285 231)"></path>
        <path d="M285 208v-18" transform="rotate(180 285 231)"></path>
        <path d="M285 208v-18" transform="rotate(270 285 231)"></path>
      </g>
      <circle class="anatomy__fan-hub" cx="285" cy="231" r="6"></circle>
      <g class="anatomy__badge" transform="translate(194 140)">
        <circle r="10"></circle>
        <text y="3">01</text>
      </g>
      <text class="anatomy__label" x="285" y="358" text-anchor="middle" data-i18n="computer.parts.cpu.name">CPU</text>
      <text class="anatomy__sublabel" x="285" y="372" text-anchor="middle" data-i18n="computer.board.cpuSub">CONTROL · ALU · REGISTERS</text>
    </g>

    <!-- 02 RAM -->
    <g class="anatomy__part" data-part="ram" tabindex="0" role="button" aria-label="Sélectionner : Mémoire vive" aria-pressed="false">
      <rect class="anatomy__hit" x="448" y="100" width="204" height="264" rx="6"></rect>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="462" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="468" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="468" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="468" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="468" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="466" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="474" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="508" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="514" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="514" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="514" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="514" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="512" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="520" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="554" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="560" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="560" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="560" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="560" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="558" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="566" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="600" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="606" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="606" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="606" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="606" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="604" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="612" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__badge" transform="translate(462 112)">
        <circle r="10"></circle>
        <text y="3">02</text>
      </g>
      <text class="anatomy__label" x="547" y="378" text-anchor="middle" data-i18n="computer.parts.ram.name">RAM</text>
      <text class="anatomy__sublabel" x="547" y="390" text-anchor="middle" data-i18n="computer.board.ramSub">WORKING MEMORY</text>
    </g>

    <!-- 03 GPU -->
    <g class="anatomy__part" data-part="gpu" tabindex="0" role="button" aria-label="Sélectionner : Carte graphique" aria-pressed="false">
      <rect class="anatomy__hit" x="108" y="386" width="462" height="148" rx="6"></rect>
      <rect class="anatomy__metal" x="108" y="390" width="12" height="140" rx="2"></rect>
      <rect class="anatomy__part-base" x="118" y="394" width="444" height="128" rx="4"></rect>
      <rect class="anatomy__part-deep" x="126" y="402" width="428" height="102" rx="3"></rect>
      <rect class="anatomy__pcie" x="126" y="505" width="380" height="9" rx="1"></rect>
      <circle class="anatomy__fan-ring" cx="210" cy="452" r="38"></circle>
      <circle class="anatomy__fan-ring" cx="430" cy="452" r="38"></circle>
      <g class="anatomy__fan anatomy__fan--gpu">
        <path d="M210 420V438"></path>
        <path d="M210 420V438" transform="rotate(60 210 452)"></path>
        <path d="M210 420V438" transform="rotate(120 210 452)"></path>
        <path d="M210 420V438" transform="rotate(180 210 452)"></path>
        <path d="M210 420V438" transform="rotate(240 210 452)"></path>
        <path d="M210 420V438" transform="rotate(300 210 452)"></path>
        <path d="M430 420V438"></path>
        <path d="M430 420V438" transform="rotate(60 430 452)"></path>
        <path d="M430 420V438" transform="rotate(120 430 452)"></path>
        <path d="M430 420V438" transform="rotate(180 430 452)"></path>
        <path d="M430 420V438" transform="rotate(240 430 452)"></path>
        <path d="M430 420V438" transform="rotate(300 430 452)"></path>
      </g>
      <circle class="anatomy__fan-hub" cx="210" cy="452" r="5"></circle>
      <circle class="anatomy__fan-hub" cx="430" cy="452" r="5"></circle>
      <g class="anatomy__badge" transform="translate(126 402)">
        <circle r="10"></circle>
        <text y="3">03</text>
      </g>
      <text class="anatomy__label" x="320" y="446" text-anchor="middle" data-i18n="computer.parts.gpu.name">GPU</text>
      <text class="anatomy__sublabel" x="320" y="460" text-anchor="middle" data-i18n="computer.board.gpuSub">PARALLEL RENDER</text>
    </g>

    <!-- 04 Storage -->
    <g class="anatomy__part" data-part="storage" tabindex="0" role="button" aria-label="Sélectionner : Stockage SSD ou HDD" aria-pressed="false">
      <rect class="anatomy__hit" x="756" y="292" width="194" height="230" rx="6"></rect>
      <rect class="anatomy__part-base" x="770" y="306" width="170" height="104" rx="4"></rect>
      <rect class="anatomy__part-deep" x="782" y="318" width="58" height="36" rx="2"></rect>
      <rect class="anatomy__part-deep" x="848" y="318" width="58" height="36" rx="2"></rect>
      <rect class="anatomy__part-deep" x="782" y="362" width="124" height="26" rx="2"></rect>
      <text class="anatomy__micro" x="785" y="378">SSD</text>
      <rect class="anatomy__part-base" x="770" y="420" width="170" height="86" rx="4"></rect>
      <circle class="anatomy__platter" cx="812" cy="463" r="30"></circle>
      <circle class="anatomy__platter-inner" cx="812" cy="463" r="10"></circle>
      <path class="anatomy__arm" d="M874 463H828L818 456"></path>
      <text class="anatomy__micro anatomy__micro--end" x="926" y="500" text-anchor="end">HDD</text>
      <g class="anatomy__badge" transform="translate(770 306)">
        <circle r="10"></circle>
        <text y="3">04</text>
      </g>
      <text class="anatomy__label" x="855" y="286" text-anchor="middle" data-i18n="computer.parts.storage.name">SSD / HDD</text>
      <text class="anatomy__sublabel" x="855" y="298" text-anchor="middle" data-i18n="computer.board.storageSub">SSD · HDD</text>
    </g>

    <!-- 05 Motherboard / chipset -->
    <g class="anatomy__part" data-part="motherboard" tabindex="0" role="button" aria-label="Sélectionner : Carte mère" aria-pressed="false">
      <rect class="anatomy__hit" x="592" y="378" width="128" height="120" rx="6"></rect>
      <rect class="anatomy__part-base" x="598" y="384" width="116" height="108" rx="4"></rect>
      <rect class="anatomy__part-deep" x="612" y="398" width="88" height="80" rx="2"></rect>
      <rect class="anatomy__chip-die" x="638" y="424" width="36" height="36" rx="2"></rect>
      <path class="anatomy__chip-lines" d="M638 412h36M638 472h36M626 424v36M686 424v36"></path>
      <g class="anatomy__badge" transform="translate(598 384)">
        <circle r="10"></circle>
        <text y="3">05</text>
      </g>
      <text class="anatomy__label" x="656" y="516" text-anchor="middle" data-i18n="computer.parts.motherboard.name">Motherboard</text>
      <text class="anatomy__sublabel" x="656" y="528" text-anchor="middle" data-i18n="computer.board.boardSub">CHIPSET · BUSES</text>
    </g>

    <!-- 06 Power supply -->
    <g class="anatomy__part" data-part="power" tabindex="0" role="button" aria-label="Sélectionner : Alimentation" aria-pressed="false">
      <rect class="anatomy__hit" x="750" y="82" width="200" height="168" rx="6"></rect>
      <rect class="anatomy__part-base" x="758" y="90" width="184" height="150" rx="4"></rect>
      <rect class="anatomy__part-deep" x="770" y="102" width="160" height="126" rx="3"></rect>
      <circle class="anatomy__fan-ring" cx="826" cy="165" r="42"></circle>
      <circle class="anatomy__fan-hub" cx="826" cy="165" r="8"></circle>
      <g class="anatomy__vents">
        <path d="M888 120H932M888 136H932M888 152H932M888 168H932M888 184H932M888 200H932"></path>
      </g>
      <circle class="anatomy__power-led" cx="926" cy="222" r="4"></circle>
      <g class="anatomy__badge" transform="translate(758 90)">
        <circle r="10"></circle>
        <text y="3">06</text>
      </g>
      <text class="anatomy__label" x="850" y="72" text-anchor="middle" data-i18n="computer.parts.power.name">Power supply</text>
      <text class="anatomy__sublabel" x="850" y="84" text-anchor="middle" data-i18n="computer.board.powerSub">12 V · 5 V · 3.3 V</text>
    </g>

    <!-- 07 Input / output -->
    <g class="anatomy__part" data-part="io" tabindex="0" role="button" aria-label="Sélectionner : Ports et périphériques" aria-pressed="false">
      <rect class="anatomy__hit" x="36" y="102" width="96" height="266" rx="6"></rect>
      <rect class="anatomy__part-base" x="42" y="108" width="84" height="254" rx="5"></rect>
      <g class="anatomy__ports">
        <rect x="52" y="120" width="28" height="16" rx="2"></rect>
        <rect x="86" y="120" width="28" height="16" rx="2"></rect>
        <rect x="52" y="144" width="28" height="16" rx="2"></rect>
        <rect x="86" y="144" width="28" height="16" rx="2"></rect>
        <rect x="52" y="168" width="62" height="20" rx="2"></rect>
        <rect x="52" y="198" width="62" height="26" rx="2"></rect>
        <circle cx="64" cy="244" r="7"></circle>
        <circle cx="88" cy="244" r="7"></circle>
        <rect x="52" y="264" width="62" height="18" rx="2"></rect>
        <rect x="52" y="292" width="62" height="24" rx="2"></rect>
        <rect x="52" y="326" width="28" height="18" rx="2"></rect>
        <rect x="86" y="326" width="28" height="18" rx="2"></rect>
      </g>
      <g class="anatomy__badge" transform="translate(42 108)">
        <circle r="10"></circle>
        <text y="3">07</text>
      </g>
      <text class="anatomy__label" x="84" y="78" text-anchor="middle" data-i18n="computer.board.ioLabel">Input / Output</text>
      <text class="anatomy__sublabel" x="84" y="92" text-anchor="middle" data-i18n="computer.board.ioSub">USB · AUDIO · NET</text>
    </g>
  </svg>`;
}
