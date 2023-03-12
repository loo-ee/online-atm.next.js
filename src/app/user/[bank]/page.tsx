import { getBank, getBanks } from "@/adapters/systemAdapter";
import { nullBank } from "@/util/globalVars";
import { BankModel } from "@/util/types";
import BankMenu from "./BankMenu";

export const dynamicParams = false;

export default async function Bank({ params }: { params: { bank: string } }) {
  let bank: BankModel | null = await getBank(params.bank);

  if (!bank) bank = nullBank;

  return <BankMenu bank={bank} />;
}

export async function generateStaticParams() {
  const banks: BankModel[] | null = await getBanks();

  if (!banks) return [{ bank: "null" }];

  return banks.map((bank) => ({
    bank: bank.bankName,
  }));
}
