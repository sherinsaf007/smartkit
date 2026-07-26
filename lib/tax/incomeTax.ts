export interface TaxResult {
  taxableIncome: number;
  incomeTax: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

export interface TaxInput {
  income: number;
  regime: "Old" | "New";
  deduction80C: number;
  deduction80D: number;
  hra: number;
}

function calculateOldTax(taxableIncome: number) {
  let tax = 0;

  if (taxableIncome <= 250000) tax = 0;

  else if (taxableIncome <= 500000)
    tax = (taxableIncome - 250000) * 0.05;

  else if (taxableIncome <= 1000000)
    tax =
      12500 +
      (taxableIncome - 500000) * 0.2;

  else
    tax =
      112500 +
      (taxableIncome - 1000000) * 0.3;

  return tax;
}

function calculateNewTax(taxableIncome: number) {
  let tax = 0;

  const slabs = [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.10],
    [1600000, 0.15],
    [2000000, 0.20],
    [2400000, 0.25],
    [Infinity, 0.30],
  ];

  let previous = 0;

  for (const [limit, rate] of slabs) {
    if (taxableIncome > previous) {
      const amount = Math.min(taxableIncome, limit) - previous;
      tax += amount * rate;
    }
    previous = limit;
  }

  return tax;
}

export function calculateIncomeTax(
  input: TaxInput
): TaxResult {
  let taxableIncome = input.income;

  if (input.regime === "Old") {
    taxableIncome -=
      input.deduction80C +
      input.deduction80D +
      input.hra;
  } else {
    taxableIncome -= 75000; // Standard Deduction
  }

  taxableIncome = Math.max(0, taxableIncome);

  let incomeTax =
    input.regime === "Old"
      ? calculateOldTax(taxableIncome)
      : calculateNewTax(taxableIncome);

  const cess = incomeTax * 0.04;

  const totalTax = incomeTax + cess;

  return {
    taxableIncome,
    incomeTax,
    cess,
    totalTax,
    effectiveRate:
      taxableIncome === 0
        ? 0
        : (totalTax / taxableIncome) * 100,
  };
}
export function compareRegimes(
  income: number,
  deduction80C: number,
  deduction80D: number,
  hra: number
) {
  const oldRegime = calculateIncomeTax({
    income,
    regime: "Old",
    deduction80C,
    deduction80D,
    hra,
  });

  const newRegime = calculateIncomeTax({
    income,
    regime: "New",
    deduction80C: 0,
    deduction80D: 0,
    hra: 0,
  });

  const recommended =
    oldRegime.totalTax < newRegime.totalTax
      ? "Old Regime"
      : "New Regime";

  const savings = Math.abs(
    oldRegime.totalTax - newRegime.totalTax
  );

  return {
    oldRegime,
    newRegime,
    recommended,
    savings,
  };
}