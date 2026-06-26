function withRange(baseMin, baseMax, flex) {
  const f = flex ?? 0.15;
  return {
    min: Math.round(baseMin * (1 - f)),
    max: Math.round(baseMax * (1 + f)),
  };
}

export const serviceConfig = {
  buildings: {
    label: "Buildings",
    icon: "HardHat",
    description:
      "Residential and commercial construction — new builds, extensions and renovations.",
    fields: [
      {
        key: "sqm",
        label: "Floor area (m²)",
        type: "number",
        placeholder: "e.g. 150",
        min: 20,
        max: 2000,
        required: true,
      },
      {
        key: "storeys",
        label: "Number of storeys",
        type: "select",
        options: [
          { value: 1, label: "Single storey" },
          { value: 2, label: "Double storey" },
          { value: 3, label: "Triple storey" },
        ],
        required: true,
      },
      {
        key: "finish",
        label: "Finish tier",
        type: "select",
        options: [
          {
            value: "standard",
            label: "Standard — R10,000–R13,000/m²",
          },
          {
            value: "premium",
            label: "Premium — R13,500–R18,000/m²",
          },
        ],
        required: true,
      },
    ],
    calculate(values) {
      const sqm = Number(values.sqm);
      const storeyMultiplier = [1, 0.85, 0.75][Number(values.storeys) - 1];
      const rates = {
        standard: { min: 10000, max: 13000 },
        premium: { min: 13500, max: 18000 },
      };
      const rate = rates[values.finish];
      const baseMin = sqm * rate.min * storeyMultiplier;
      const baseMax = sqm * rate.max * storeyMultiplier;
      const result = withRange(baseMin, baseMax, 0.1);
      return {
        ...result,
        breakdown: [
          {
            label: "Base construction",
            amount: `R ${formatNum(result.min)} – R ${formatNum(result.max)}`,
          },
          {
            label: "Professional fees (8–12%)",
            amount: `R ${formatNum(Math.round(result.min * 0.1))} – R ${formatNum(Math.round(result.max * 0.12))}`,
          },
        ],
      };
    },
  },

  foundations: {
    label: "Foundations",
    icon: "Hammer",
    description:
      "Residential and commercial foundation solutions — slabs, strips, rafts and piles.",
    fields: [
      {
        key: "type",
        label: "Foundation type",
        type: "select",
        options: [
          { value: "slab", label: "Slab on grade — R1,200–R2,000/m²" },
          { value: "strip", label: "Strip foundation — R1,500–R2,500/m²" },
          { value: "raft", label: "Raft foundation — R2,200–R3,500/m²" },
          { value: "piled", label: "Piled foundation — R3,000–R8,000/m²" },
        ],
        required: true,
      },
      {
        key: "sqm",
        label: "House floor area (m²)",
        type: "number",
        placeholder: "e.g. 150",
        min: 20,
        max: 2000,
        required: true,
      },
      {
        key: "soil",
        label: "Soil condition",
        type: "select",
        options: [
          { value: "good", label: "Good (stable soil)" },
          { value: "moderate", label: "Moderate" },
          { value: "poor", label: "Poor (clay / problem soil)" },
        ],
        required: true,
      },
    ],
    calculate(values) {
      const sqm = Number(values.sqm);
      const rates = {
        slab: { min: 1200, max: 2000 },
        strip: { min: 1500, max: 2500 },
        raft: { min: 2200, max: 3500 },
        piled: { min: 3000, max: 8000 },
      };
      const soilMultiplier = {
        good: 0.9,
        moderate: 1.0,
        poor: 1.2,
      };
      const rate = rates[values.type];
      const mult = soilMultiplier[values.soil];
      const baseMin = sqm * rate.min * mult;
      const baseMax = sqm * rate.max * mult;
      const result = withRange(baseMin, baseMax, 0.1);
      return {
        ...result,
        breakdown: [
          {
            label: "Foundation work",
            amount: `R ${formatNum(result.min)} – R ${formatNum(result.max)}`,
          },
          {
            label: "Engineering fees (approx.)",
            amount: `R ${formatNum(Math.round(result.min * 0.05))} – R ${formatNum(Math.round(result.max * 0.08))}`,
          },
        ],
      };
    },
  },

  electricity: {
    label: "Electricity",
    icon: "Zap",
    description:
      "Electrical installations, rewiring and compliance for residential and commercial properties.",
    fields: [
      {
        key: "type",
        label: "Work type",
        type: "select",
        options: [
          { value: "new", label: "New installation" },
          { value: "rewire", label: "Rewire / upgrade" },
        ],
        required: true,
      },
      {
        key: "bedrooms",
        label: "Number of bedrooms",
        type: "select",
        options: [
          { value: 1, label: "1-bedroom" },
          { value: 2, label: "2-bedroom" },
          { value: 3, label: "3-bedroom" },
          { value: 4, label: "4-bedroom" },
          { value: 5, label: "5+ bedrooms" },
        ],
        required: true,
      },
      {
        key: "extras",
        label: "Extras (optional)",
        type: "checkbox",
        options: [
          { value: "generator", label: "Generator prep (+R8k–R15k)" },
          { value: "inverter", label: "Inverter wiring (+R5k–R12k)" },
          { value: "fence", label: "Electric fence prep (+R3k–R6k)" },
        ],
      },
    ],
    calculate(values) {
      const rates = {
        new: {
          1: { min: 15000, max: 28000 },
          2: { min: 22000, max: 40000 },
          3: { min: 30000, max: 55000 },
          4: { min: 45000, max: 90000 },
          5: { min: 60000, max: 160000 },
        },
        rewire: {
          1: { min: 12000, max: 22000 },
          2: { min: 18000, max: 32000 },
          3: { min: 25000, max: 45000 },
          4: { min: 35000, max: 70000 },
          5: { min: 50000, max: 120000 },
        },
      };
      const b = Number(values.bedrooms);
      const base = rates[values.type][b] || rates[values.type][5];
      const extras = values.extras || [];
      let extraMin = 0;
      let extraMax = 0;
      if (extras.includes("generator")) {
        extraMin += 8000;
        extraMax += 15000;
      }
      if (extras.includes("inverter")) {
        extraMin += 5000;
        extraMax += 12000;
      }
      if (extras.includes("fence")) {
        extraMin += 3000;
        extraMax += 6000;
      }
      const result = withRange(base.min + extraMin, base.max + extraMax, 0.05);
      return {
        ...result,
        breakdown: [
          {
            label: `Electrical work (${values.type === "new" ? "new build" : "rewire"})`,
            amount: `R ${formatNum(base.min)} – R ${formatNum(base.max)}`,
          },
          ...(extras.length
            ? [
                {
                  label: "Extras",
                  amount: `R ${formatNum(extraMin)} – R ${formatNum(extraMax)}`,
                },
              ]
            : []),
          {
            label: "COC & testing",
            amount: "R 1,000 – R 2,500",
          },
        ],
      };
    },
  },

  carports: {
    label: "Carports",
    icon: "Car",
    description:
      "Carport structures — shade net, metal and aluminium options for single to triple vehicles.",
    fields: [
      {
        key: "cars",
        label: "Number of cars",
        type: "select",
        options: [
          { value: 1, label: "Single (3m × 6m)" },
          { value: 2, label: "Double (6m × 6m)" },
          { value: 3, label: "Triple (9m × 6m)" },
        ],
        required: true,
      },
      {
        key: "material",
        label: "Material",
        type: "select",
        options: [
          { value: "shade", label: "Shade net" },
          { value: "metal", label: "Metal" },
          { value: "aluminium", label: "Aluminium" },
        ],
        required: true,
      },
    ],
    calculate(values) {
      const rates = {
        1: {
          shade: { min: 8000, max: 15000 },
          metal: { min: 15000, max: 28000 },
          aluminium: { min: 18000, max: 35000 },
        },
        2: {
          shade: { min: 12500, max: 22000 },
          metal: { min: 22000, max: 45000 },
          aluminium: { min: 28000, max: 55000 },
        },
        3: {
          shade: { min: 22000, max: 38000 },
          metal: { min: 38000, max: 70000 },
          aluminium: { min: 45000, max: 85000 },
        },
      };
      const base = rates[Number(values.cars)][values.material];
      const result = withRange(base.min, base.max, 0.1);
      return {
        ...result,
        breakdown: [
          {
            label: "Carport structure & installation",
            amount: `R ${formatNum(result.min)} – R ${formatNum(result.max)}`,
          },
          {
            label: "Site preparation (approx.)",
            amount: `R ${formatNum(Math.round(result.min * 0.08))} – R ${formatNum(Math.round(result.max * 0.12))}`,
          },
        ],
      };
    },
  },

  ceilings: {
    label: "Ceilings",
    icon: "Layout",
    description:
      "Ceiling installation, finishing and repairs — gypsum, PVC, suspended, timber and acoustic.",
    fields: [
      {
        key: "material",
        label: "Ceiling material",
        type: "select",
        options: [
          { value: "gypsum", label: "Rhino / Gypsum — R220–R350/m²" },
          { value: "pvc", label: "PVC — R280–R400/m²" },
          { value: "suspended", label: "Suspended (grid + tiles) — R300–R450/m²" },
          { value: "timber", label: "Timber — R450–R800/m²" },
          { value: "acoustic", label: "Acoustic — R350–R550/m²" },
        ],
        required: true,
      },
      {
        key: "area",
        label: "Total area (m²)",
        type: "number",
        placeholder: "e.g. 100",
        min: 5,
        max: 2000,
        required: true,
      },
      {
        key: "rooms",
        label: "Number of rooms",
        type: "number",
        placeholder: "e.g. 4",
        min: 1,
        max: 50,
        required: true,
      },
    ],
    calculate(values) {
      const area = Number(values.area);
      const rates = {
        gypsum: { min: 220, max: 350 },
        pvc: { min: 280, max: 400 },
        suspended: { min: 300, max: 450 },
        timber: { min: 450, max: 800 },
        acoustic: { min: 350, max: 550 },
      };
      const rate = rates[values.material];
      const baseMin = area * rate.min;
      const baseMax = area * rate.max;
      const result = withRange(baseMin, baseMax, 0.1);
      return {
        ...result,
        breakdown: [
          {
            label: "Ceiling installation",
            amount: `R ${formatNum(result.min)} – R ${formatNum(result.max)}`,
          },
          {
            label: "Cornice & finishing",
            amount: `R ${formatNum(Math.round(result.min * 0.08))} – R ${formatNum(Math.round(result.max * 0.12))}`,
          },
        ],
      };
    },
  },
};

export const services = [
  { slug: "buildings", label: "Buildings", description: "New builds, extensions & renovations" },
  { slug: "foundations", label: "Foundations", description: "Slabs, strips, rafts & piles" },
  { slug: "electricity", label: "Electricity", description: "Installations, rewiring & compliance" },
  { slug: "carports", label: "Carports", description: "Shade net, metal & aluminium structures" },
  { slug: "ceilings", label: "Ceilings", description: "Gypsum, PVC, suspended, timber & more" },
];

export function calculateEstimate(slug, values) {
  const config = serviceConfig[slug];
  if (!config || typeof config.calculate !== "function") return null;
  return config.calculate(values);
}

function formatNum(n) {
  return n.toLocaleString("en-ZA");
}
