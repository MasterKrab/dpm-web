import { createError } from 'http_errors/mod.ts';
import { renderFileToString } from 'dejs/mod.ts';
import { json, opine, serveStatic, urlencoded } from 'opine/mod.ts';
import { dirname, fromFileUrl, join } from 'path/mod.ts';

import type { ErrorRequestHandler } from 'opine/mod.ts';

import indexRouter from 'routes/index.ts';
import installRoute from 'routes/install.ts';
import schemaRoute from 'routes/schema.ts';

const __dirname = fromFileUrl(dirname(import.meta.url));

const app = opine();

// View engine setup
app.engine('ejs', renderFileToString);
app.set('views', join(Deno.cwd(), 'views'));
app.set('view engine', 'ejs');

// Handle different incoming body types
app.use(json());
app.use(urlencoded());

// Serve our static assets
app.use(serveStatic(join(Deno.cwd(), 'public')));

// Mount our routers
app.use('/', indexRouter);
app.use('/install', installRoute);
app.use('/schema', schemaRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// Render the error page
	res.setStatus(err.status ?? 500);
	res.render('error', {
		title: 'Deno Package Manager ERROR',
	});
};

app.use(errorHandler);

export default app;
