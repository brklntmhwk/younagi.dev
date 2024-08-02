export const onRequestPost: PagesFunction<Env> = async (context) => {
  return context.env.EMAIL_SENDER.fetch(context.request);
};
