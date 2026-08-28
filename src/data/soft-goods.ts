/**
 * Soft Goods catalog — single source for hub cards and page routes.
 *
 * status:
 *   - 'published' → listed and built always
 *   - 'draft'     → visible in `astro dev` only; omitted from production builds
 *
 * Flip `status` to publish a card/page.
 */

export type SoftGoodsStatus = 'draft' | 'published';
export type SoftGoodsSection = 'skills' | 'tools';

export interface SoftGoodsPage {
  title: string;
  slug: string;
  section: SoftGoodsSection;
  status: SoftGoodsStatus;
  description: string;
  image?: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** Caption displayed below the hero image */
  heroImageCaption?: string;
  /** Placeholder intro when the page has no custom content component */
  body: string;
}

export const softGoodsPages: SoftGoodsPage[] = [
  // —— Skills to Learn ——
  {
    title: 'Patternmaking',
    slug: 'patternmaking',
    section: 'skills',
    status: 'published',
    description:
      'Draft and adjust 2D patterns so pieces fit, align, and sew cleanly into a finished soft-goods form.',
    heroImage: 'https://static.robray.net/images/soft-goods/pattern-making.jpg',
    heroImageAlt: 'Overhead view of pattern pieces drawn on kraft paper with blue pen, ready for cutting and sewing',
    heroImageCaption: 'Patternmaking translates a product design into cuttable pieces. Patterns must account for grain, seam allowance, notches, and how pieces will align during assembly.',
    image: 'https://static.robray.net/images/soft-goods/pattern-making.jpg',
    body: 'Patternmaking turns a product idea into cuttable pieces. This page will cover patterning language, seam allowance, grain, notches, and how pattern choices show up in the sewn sample.',
  },
  {
    title: 'Winding a Bobbin',
    slug: 'winding-a-bobbin',
    section: 'skills',
    status: 'draft',
    description: 'Load and wind bobbins correctly so lower-thread tension stays consistent through a seam.',
    body: 'A well-wound bobbin is quiet infrastructure for clean stitches. This page will walk through winding, seating, and checking the bobbin path on studio machines.',
  },
  {
    title: 'Threading a Sewing Machine',
    slug: 'threading-a-sewing-machine',
    section: 'skills',
    status: 'draft',
    description: 'Thread the upper path and needle so stitch formation and tension are reliable from the first sample.',
    body: 'Machine threading looks simple until a missed guide ruins every stitch. This page will cover the full upper-thread path, common mistakes, and a quick reset when something goes wrong.',
  },
  {
    title: 'Sewing a Straight Stitch',
    slug: 'sewing-a-straight-stitch',
    section: 'skills',
    status: 'draft',
    description: 'Control speed, guidance, and stitch length to sew straight, even seams on fabric and product materials.',
    body: 'The straight stitch is the foundation of most assembly. This page will cover setup, guiding techniques, and practice drills that transfer to bags, straps, and soft product seams.',
  },
  {
    title: 'Backtacking',
    slug: 'backtacking',
    section: 'skills',
    status: 'draft',
    description: 'Lock seam starts and ends so construction holds under handling and wear.',
    body: 'Backtacking (reverse stitching) secures seam ends without knots. This page will show when to backtack, how much to reverse, and alternatives for technical or visible seams.',
  },
  {
    title: 'Fabric Cutting',
    slug: 'fabric-cutting',
    section: 'skills',
    status: 'draft',
    description: 'Mark and cut fabric accurately so pieces match the pattern and sew without warp or waste.',
    body: 'Cutting quality shows in every later step. This page will cover layout on grain, transfer methods, tools, and studio habits that keep cut parts true to the pattern.',
  },
  {
    title: 'Machine Sewing',
    slug: 'machine-sewing',
    section: 'skills',
    status: 'draft',
    description: 'Move from single seams to controlled machine work—handling bulk, curves, and multi-part assemblies.',
    body: 'Machine sewing for products goes beyond garment hems. This page will expand on machine control when parts are thick, layered, or structural.',
  },
  {
    title: 'Seam Construction',
    slug: 'seam-construction',
    section: 'skills',
    status: 'draft',
    description: 'Choose and sew seam types that match load, appearance, and the materials you are joining.',
    body: 'Seam construction is how parts become structure. This page will introduce common seam types used in soft goods and how to pick one for strength, bulk, and finish.',
  },
  {
    title: 'Topstitching',
    slug: 'topstitching',
    section: 'skills',
    status: 'draft',
    description: 'Add visible rows of stitching for strength, alignment, and a controlled finish on exteriors.',
    body: 'Topstitching can reinforce a seam or define the product’s look. This page will cover spacing, thread choice, and guiding methods for clean parallel rows.',
  },
  {
    title: 'Zipper Installation',
    slug: 'zipper-installation',
    section: 'skills',
    status: 'draft',
    description: 'Install zippers so openings stay smooth, strong, and correctly aligned in bags and closures.',
    body: 'Zippers fail more from install mistakes than from the zipper itself. This page will cover prep, placement, stitching sequence, and common soft-goods zipper constructions.',
  },
  {
    title: 'Edge-finishing',
    slug: 'edge-finishing',
    section: 'skills',
    status: 'draft',
    description: 'Finish raw edges so assemblies resist fray, look intentional, and hold up in use.',
    body: 'Edge finishing protects fabric and communicates craft. This page will compare binding, overlock, and other finishes suited to product work.',
  },
  {
    title: 'Bartacking',
    slug: 'bartacking',
    section: 'skills',
    status: 'draft',
    description: 'Place dense reinforcement stitches at stress points so straps, pockets, and corners survive load.',
    body: 'Bartacks concentrate strength where soft goods fail first. This page will cover where to bartack, machine setup, and visual control of the reinforcement bar.',
  },
  {
    title: 'Seam Sealing and Weatherproofing',
    slug: 'seam-sealing-and-weatherproofing',
    section: 'skills',
    status: 'draft',
    description: 'Close stitch lines and protect materials against weather for outdoor and technical soft goods.',
    body: 'Needle holes and material choice decide whether a product sheds weather. This page will introduce sealants, tapes, and construction choices that support weatherproof prototypes.',
  },
  {
    title: 'Prototyping',
    slug: 'prototyping',
    section: 'skills',
    status: 'draft',
    description:
      'Plan iterative soft-goods prototypes from sketches and mockups through testable sewn samples.',
    body: 'Soft-goods prototyping is a sequence of material and construction tests, not one perfect make. This page will cover mockups, material trials, and how to learn from each sewn sample.',
  },

  // —— Things to Use ——
  {
    title: 'Cloth',
    slug: 'cloth',
    section: 'tools',
    status: 'draft',
    description:
      'Fabric types, weights, grain, and how material choice affects structure, drape, and durability in soft-goods making.',
    body: 'Cloth is the structural base of soft goods. Fiber content, weave or knit structure, weight, and grain determine how a material drapes, sews, wears, and holds form. This page will expand with studio guidance for selecting and preparing fabrics for product prototypes.',
  },
  {
    title: 'Sewing Machines',
    slug: 'sewing-machines',
    section: 'tools',
    status: 'draft',
    image: 'https://static.robray.net/images/soft-goods/henry-ford-sewing-machine.jpg',
    heroImage: 'https://static.robray.net/images/soft-goods/henry-ford-sewing-machine.jpg',
    heroImageAlt: 'Historic sewing machine used as a visual header for the sewing machines topic page',
    heroImageCaption: 'Sewing machines are fundamental tools in soft-goods work. The right machine for the job depends on your material, stitch needs, and production style—from nimble household machines to powerful industrial workhorses.',
    description:
      'Studio machine basics, setup, safe operation, and which stitches and tools support product design prototypes.',
    body: '',
  },
  {
    title: 'Thread',
    slug: 'thread',
    section: 'tools',
    status: 'published',
    image: 'https://static.robray.net/images/soft-goods/gutermann-mara-70.jpg',
    heroImage: 'https://static.robray.net/images/soft-goods/gutermann-mara-70.jpg',
    heroImageAlt: 'Gütermann Mara thread spool with ticket number 70 shown on the yellow end label',
    heroImageCaption: 'In soft-goods product design, matching thread type and weight to fabric and use is as important as choosing the fabric itself.',
    description:
      'Choosing the right thread for strength, stretch, and finish. We will figure out thread sizing numbers and look at Gütermann Mara, Mara rPET, and Tera.',
    body: '', // full body: ThreadContent component
  },
  {
    title: 'Tools',
    slug: 'tools',
    section: 'tools',
    status: 'draft',
    description:
      'Hand tools for soft-goods making—scissors, snips, awls, seam rippers, and the kit you keep at the sewing bench.',
    body: 'Soft-goods tools are the everyday implements that shape, open, and finish work at the machine and cutting table. This page will expand with studio tool recommendations and how each one fits into a product-making workflow.',
  },
  {
    title: 'Measuring & Marking',
    slug: 'measuring-and-marking',
    section: 'tools',
    status: 'draft',
    description:
      'Rulers, tapes, squares, and layout aids for accurate measuring and transferring dimensions onto fabric.',
    body: 'Accurate soft goods start with accurate layout. This page will cover measuring tools and marking methods used together when you draft, cut, and assemble product prototypes.',
  },
  {
    title: 'Marking',
    slug: 'marking',
    section: 'tools',
    status: 'draft',
    description:
      'Wax, tailor’s chalk, and other markers for transferring pattern lines, notches, and construction marks onto fabric.',
    body: 'Marking media leave temporary or durable guides on cloth and technical fabrics. This page will cover different kinds of wax and tailor’s chalk—when each works, how marks behave on different materials, and what to use for studio prototypes.',
  },
  {
    title: 'Zippers',
    slug: 'zippers',
    section: 'tools',
    status: 'published',
    heroImage: 'https://static.robray.net/images/soft-goods/zipper-closeup.jpg',
    heroImageAlt: 'Close-up of a zipper chain and slider used as the hero image for the zippers page',
    heroImageCaption: 'Zipper sizing is determined by the width of the teeth across the closed chain. The number (such as #5 or #8) indicates this width in millimeters and is your primary specification when choosing a zipper.',
    description:
      'Zipper types, sizes, and how the zipper number relates to tooth width when specifying closures for soft goods.',
    body: '', // full body: ZippersContent component
  },
  {
    title: 'Velcro',
    slug: 'velcro',
    section: 'tools',
    status: 'draft',
    description:
      'Hook-and-loop fasteners for adjustable closures, straps, and modular soft-goods connections.',
    body: 'Velcro (hook-and-loop) is a fast, adjustable fastener for straps, flaps, and modular attachments. This page will expand with types, sew-on vs adhesive options, and how to specify width and strength for product work.',
  },
  {
    title: 'Grosgrain & Webbing',
    slug: 'grosgrain-and-webbing',
    section: 'tools',
    status: 'draft',
    description:
      'Ribbons and woven straps used for reinforcement, handles, edges, and load-bearing soft-goods structure.',
    body: 'Grosgrain and webbing carry load and finish edges where fabric alone is not enough. This page will expand with materials, widths, and how these tapes and straps show up in bags, wearables, and studio prototypes.',
  },
  {
    title: 'Juki 8700H',
    slug: 'juki-8700h',
    section: 'tools',
    status: 'draft',
    image: 'https://static.robray.net/images/soft-goods/juki-ddl-8700.webp',
    heroImage: 'https://static.robray.net/images/soft-goods/juki-ddl-8700.webp',
    heroImageAlt: 'Juki DDL-8700 industrial sewing machine on a white background',
    heroImageCaption: 'The Juki 8700H is an industrial straight-stitch machine built for fast, consistent seams on medium-to-heavy materials. For product details and documentation, see the <a href="https://juki.com/ddl-8700" target="_blank" rel="noopener noreferrer">JUKI DDL-8700 product page</a>.',
    description:
      'Overview, threading notes, and studio guidance for the Juki 8700H industrial straight-stitch sewing machine.',
    body: '',
  },
  {
    title: 'Juki HZL-F600',
    slug: 'juki-hzl-f600',
    section: 'tools',
    status: 'draft',
    image: 'https://static.robray.net/images/soft-goods/juki-hzl-f600.jpg',
    heroImage: 'https://static.robray.net/images/soft-goods/juki-hzl-f600.jpg',
    heroImageAlt: 'Juki HZL-F600 home sewing machine on a white background',
    heroImageCaption: 'The Juki HZL-F600 is a computerized household sewing machine with versatile stitch options, quilting features, and automatic needle threading—ideal for mixed studio tasks, prototyping, and skill building. For product details and documentation, see the <a href="https://www.juki.co.jp/household_en/products/list/home/hzlf600.html" target="_blank" rel="noopener noreferrer">JUKI HZL-F600 product page</a>.',
    description:
      'Overview, threading notes, and studio guidance for the Juki HZL-F600 computerized home sewing machine.',
    body: '',
  },
];

/** Drafts are visible in dev, hidden from production builds and production listings. */
export function isSoftGoodsVisible(page: SoftGoodsPage): boolean {
  if (page.status === 'published') return true;
  return import.meta.env.DEV;
}

export function getSoftGoodsPages(section?: SoftGoodsSection): SoftGoodsPage[] {
  return softGoodsPages
    .filter((page) => (section ? page.section === section : true))
    .filter(isSoftGoodsVisible);
}

export function getSoftGoodsBySlug(slug: string): SoftGoodsPage | undefined {
  return softGoodsPages.find((page) => page.slug === slug);
}
