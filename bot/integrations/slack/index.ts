import { stringify } from "ini";

import axios from "axios";

const webHookUrl =
  "https://hooks.slack.com/services/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";

interface SlackAttachmentField {
  title: string;
  value: string;
  short: boolean;
}
interface SlackAttachment {
  fallback: string;
  color: string;
  pretext?: string;
  author_name: string;
  author_link: string;
  author_icon: string;
  title: string;
  text: string;
  fields: SlackAttachmentField[];
  image_url: string;
  thumb_url: string;
  footer: string;
  footer_icon: string;
  ts: number;
}
interface SlackPayload {
  username?: string;
  channel?: string;
  attachments: SlackAttachment[];
}

export const buildSlackMessage = (
  serviceApp: string,
  isError: boolean,
  title: string,
  text: string,
  priority: string,
  server: string
) => {
  const slackMessage: SlackPayload = {
    username: "X4 Service Watcher ",
    channel: "@dexter.hristov",
    attachments: [
      {
        fallback: text,
        color: isError ? "#ff0000" : "#00ff00",
        author_name: serviceApp,
        author_link: "http://flickr.com/bobby/",
        author_icon: "http://flickr.com/icons/bobby.jpg",
        title,
        text,
        fields: [
          {
            title: "Server",
            value: server,
            short: false
          },
          {
            title: "Priority",
            value: priority,
            short: false
          }
        ],
        image_url: "http://my-website.com/path/to/image.jpg",
        thumb_url: "http://example.com/path/to/thumb.png",
        footer: "x4 bot",
        footer_icon:
          "https://platform.slack-edge.com/img/default_application_icon.png",
        ts: 123456789
      }
    ]
  };
  return slackMessage;
};

export const post = (payload: SlackPayload) => {
  axios
    .post(webHookUrl, payload)
    .then((response: any) => {
      //
    })
    .catch((error: any) => {
      console.log(error);
    });
};
