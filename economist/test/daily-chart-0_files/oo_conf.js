/* OnlineOpinion v5.4.4 */
/* Released: 9/26/2011 */
/* Components: Full */
/* The following code is Copyright 1998-2010 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com */


/* Inline configuration */
  var oo_feedback = new OOo.Ocode({
	legacyVariables: s.pageName + ';' + s.channel
});


/* [+] Floating Icon configuration */
  var oo_floating = new OOo.Ocode({
	  floating: {}
	, cookie: {
		  name: 'oo_floating'
		, type: 'domain'
		, expiration: 3600
	  }
	, disappearOnClick: true
	, legacyVariables: s.pageName + ';' + s.channel
  });
