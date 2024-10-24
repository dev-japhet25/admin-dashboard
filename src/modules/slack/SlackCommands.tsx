"use client";
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import AccountCategoriesCommand from "./commands/accountCategories";
import AllAdminsCommand from "./commands/allAdmins";
import AllMembersCommand from "./commands/allMembers";
import AppUserCommand from "./commands/appUser";
import BalanceCommand from "./commands/balance";
import BlockUnblockCommand from "./commands/blockUnblock";
import BotSetup from "./commands/botSetup";
import BranchesCommand from "./commands/branches";
import CategoriesCommand from "./commands/categories";
import CategoryPaymentSetupCommand from "./commands/cateogryPaymentSetup";
import ChurchesCommand from "./commands/churches";
import FinanceReportCommand from "./commands/financialReport";
import InsuranceSetupCommand from "./commands/insuranceSetup";
import LookupCommand from "./commands/lookup";
import MemberTypesCommand from "./commands/memberTypes";
import PaymentCategorySetup from "./commands/paymentCategory";
import ResetPassword from "./commands/resetPassword";
import SenderId from "./commands/senderId";
import SetupChatbot from "./commands/setupChatbot";
import SetupPaymentCommand from "./commands/setupPayment";
import SubscriptionSetupCommand from "./commands/setupSubscription";
import SetupUssd from "./commands/setupUssd";
import SubscribeCommand from "./commands/subscribe";
import SubscriptionCommand from "./commands/subscription";
import Topup from "./commands/topUp";
import UserToken from "./commands/userToken";
import UssdCommand from "./commands/ussd";
import UssdBranchesCommand from "./commands/ussdBranches";

const componentMap: Record<string, React.ComponentType> = {
  appUser: AppUserCommand,
  allAdmins: AllAdminsCommand,
  allMembers: AllMembersCommand,
  user_token: UserToken,
  resetPassword: ResetPassword,
  setup_ussd: SetupUssd,
  ussd: UssdCommand,
  ussdBranches: UssdBranchesCommand,
  setupPayment: SetupPaymentCommand,
  topup: Topup,
  balance: BalanceCommand,
  paymentCategorySetup: PaymentCategorySetup,
  subscribe: SubscribeCommand,
  subscription: SubscriptionCommand,
  subscriptionSetup: SubscriptionSetupCommand,
  accountCategories: AccountCategoriesCommand,
  categoryPaymentSetup: CategoryPaymentSetupCommand,
  lookup: LookupCommand,
  member_type: MemberTypesCommand,
  branches: BranchesCommand,
  sender_id: SenderId,
  setup_chatbot: SetupChatbot,
  financialReport: FinanceReportCommand,
  churches: ChurchesCommand,
  blockUnblock: BlockUnblockCommand,
  insuranceSetup: InsuranceSetupCommand,
  categories: CategoriesCommand,
  botSetup: BotSetup,
};

const commandLabels: Record<string, string> = {
  appUser: "App User",
  allAdmins: "All Admins",
  allMembers: "All Members",
  user_token: "User Token",
  resetPassword: "Reset Password",
  setup_ussd: "Setup USSD",
  ussd: "USSD",
  ussdBranches: "USSD Branches",
  setupPayment: "Setup Payment",
  topup: "Top Up",
  balance: "Balance",
  paymentCategorySetup: "Payment Category Setup",
  subscribe: "Subscribe",
  subscription: "Subscription",
  subscriptionSetup: "Subscription Setup",
  accountCategories: "Account Categories",
  categoryPaymentSetup: "Category Payment Setup",
  lookup: "Lookup",
  member_type: "Member Type",
  branches: "Branches",
  sender_id: "Sender ID",
  setup_chatbot: "Setup Chatbot",
  financialReport: "Financial Report",
  churches: "Churches",
  blockUnblock: "Block/Unblock",
  insuranceSetup: "Insurance Setup",
  categories: "Categories",
  botSetup: "Bot Setup",
};

const SlackCommands = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [availableCommands, setAvailableCommands] = useState<string[]>([]);

  useEffect(() => {
    const commands = JSON.parse(localStorage.getItem("userCommands") || "[]");
    setAvailableCommands(commands);
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedComponent(value);
  };

  const SelectedComponent = selectedComponent
    ? componentMap[selectedComponent]
    : null;

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="mx-auto">
        <label
          htmlFor="command-select"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-100"
        >
          Select a Command
        </label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full" id="command-select">
            <SelectValue placeholder="Select a command" />
          </SelectTrigger>
          <SelectContent>
            {availableCommands.map((command) => (
              <SelectItem key={command} value={command}>
                {commandLabels[command] || command}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Card className="mt-8">
          <CardContent className="p-6 min-h-[300px]">
            {SelectedComponent && <SelectedComponent />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SlackCommands;