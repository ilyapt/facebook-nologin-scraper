export const checkIsPublicPage = (doc: CheerioStatic): boolean =>
    (doc('#pagelet_group_').length > 0) ||
    (doc('#PagesProfileHomePrimaryColumnPagelet').length > 0) ||
    (doc('.userContentWrapper').length > 0);
