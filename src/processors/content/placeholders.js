const Placeholders = {
	origin: () => location.origin,
	pathname: () => location.pathname,
	page_created_at: () => String(window.__info__.birthtime),
	page_content_path: () => window.__info__.content_path,
	page_path: () => window.__info__.path || window.__info__.key,
	page_title: () => window.__info__.title || window.__info__.key,
	page_key: () => window.__info__.key,
	page_delisted: () => window.__info__.delisted,
}

export default content => content.replaceAll(/{(\w+)}/g, (raw, identifier) =>
	identifier in Placeholders
		? Placeholders[identifier]() || raw
		: raw
)