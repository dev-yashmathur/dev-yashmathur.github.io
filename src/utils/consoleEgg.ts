import { config } from './config';

/** A `git log --graph` of my career for anyone who opens devtools. */
export const printConsoleEgg = () => {
  const head = 'color:#1f883d;font-weight:bold';
  const tag = 'color:#bf8700';
  const dim = 'color:#888';
  const plain = '';
  const lines: [string, ...string[]][] = [
    [`%c* ${__COMMIT__}%c (HEAD -> main)%c ship Marco: code review people actually listen to`, head, tag, plain],
    ['%c* 7f2a1d0%c join Hivel as Senior AI Software Engineer', dim, plain],
    ['%c* 4c1e9a7%c lead AI product teams @ Techolution', dim, plain],
    ['%c| * %c(tag: portee, bench, garden-maze, increzio, …)%c nights and weekends', dim, tag, plain],
    ['%c|/', dim],
    ['%c* 9b03fd2%c go full-time as an AI Engineer @ Techolution', dim, plain],
    ['%c* 2e7d5c8%c intern: AI Engineering @ ADP', dim, plain],
    ['%c* e3b0c44%c Initial commit', dim, plain],
  ];
  lines.forEach(([text, ...styles]) => console.log(text, ...styles));
  console.log(
    `\n%cYou're reading the source. We should talk.%c\n${config.email} · ${config.social.linkedin}`,
    'font-weight:bold;font-size:13px', dim,
  );
};
