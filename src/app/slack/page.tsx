"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SlackCommands from "@/modules/slack/SlackCommands";


const Slack = () => {
  return (
    <DefaultLayout>
      <SlackCommands />
    </DefaultLayout>
  );
};

export default Slack;
