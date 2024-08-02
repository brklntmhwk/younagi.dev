export const onRequestPost: PagesFunction<Env> = async (context) => {
    return context.env.ASSETS.fetch(context.request);
};
