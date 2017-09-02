function main_action() {
  if (req.postParams.stripeTokenType === 'card') {
    var url = getProperty('claustra.stripe.url', 'https://api.stripe.com/v1/charges');
    var http = new helma.Http();

    http.setCredentials(getProperty('claustra.stripe.secret'), '');

    http.setContent({
      amount: getProperty('claustra.stripe.amount'),
      currency: 'eur',
      source: req.postParams.stripeToken,
      description: getProperty('claustra.stripe.description')
    });

    var response = http.getUrl(url);
    var data = JSON.parse(response.content);

    if (response.code !== 200 || !data.paid) {
      res.message = gettext('An error occurred. Please try again.');
      res.redirect(req.data.http_referer);
    } 
    
    res.debug(req.postParams);
    res.debug(response.toSource());
    res.debug(data.toSource());

    res.message = gettext('Thanks a lot for your support!');
    res.redirect(req.data.http_referer);
  }
}
