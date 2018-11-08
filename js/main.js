$(document).ready(function () {

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  const username = "humaneloveio", lim = 2;

  steem.api.getDiscussionsByBlog({tag: username, limit: lim}, function(err, result) {

    // Assign result to a variable
    var post = result;

    // Loop through result for proccess data
    $.each(post,function(key,value){

      var img = JSON.parse(value.json_metadata);

      img = img.image;

      url = 'https://steemit.com'+value.url;

      // Lets trim body content to display a reduced amount of data on homepage
      var body = jQuery.trim(value.body).substring(0, 600);

      // Instantiate a new showdown converter object
      var converter = new showdown.Converter();

      // Set options
      converter.setOption('metadata', 'true');
      converter.setOption('backslashEscapesHTMLTags', 'true');
      converter.setOption('requireSpaceBeforeHeadingText', 'true');
      converter.setOption('simpleLineBreaks', 'true');
      converter.setOption('disableForced4SpacesIndentedSublists', 'true');
      converter.setOption('smartIndentationFix', 'true');
      converter.setOption('literalMidWordAsterisks', 'true');
      converter.setOption('literalMidWordUnderscores', 'true');
      converter.setOption('excludeTrailingPunctuationFromURLs', 'true');
      converter.setOption('simplifiedAutoLink', 'true');
      converter.setOption('parseImgDimensions', 'true');
      converter.setOption('omitExtraWLInCodeBlocks', 'true');
      converter.setOption('noHeaderId', 'true');
      converter.setOption('customizedHeaderId', 'true');
      converter.setOption('ghCompatibleHeaderId', 'true');
      converter.setOption('prefixHeaderId', 'true');
      converter.setOption('rawPrefixHeaderId', 'true');
      converter.setOption('rawHeaderId', 'true');
      converter.setOption('headerLevelStart', 'true');
      converter.setOption('excludeTrailingPunctuationFromURLs', 'true');
      converter.setOption('strikethrough', 'true');
      converter.setOption('tables', 'true');
      converter.setOption('tablesHeaderId', 'true');

      //converts markdown to html
      body = converter.makeHtml(body);

      body = body.replace(/(<([^>]+)>)/ig,"").replace(/<a(\s[^>]*)?>.*?<\/a>/ig,"").replace(/(?:https?|ftp):\/\/[\n\S]+/g,"").substr(0, 260) + '...';

      var mainpost = '<div class="col-md-6"><div class="daan-post"><div class="post-img"><img src="'+img[0]+'" class="daan-post-img" alt="" /><span></span></div><h4 class="post-title"><a href="#" title="">'+value.title+'</a></h4><ul class="meta"><li><i class="fa fa-user"></i> <a href="#" title="">'+value.author+'</a></li><li><i class="fa fa-comments"></i> <a href="#" title="">'+value.children+'</a></li></ul><p>'+body+'...'+'</p><a href="'+url+'" id="blogreadmore" target="_blank">Read more</a></div></div>';

      $('#appendblog').append(mainpost);

    })

  });

})
