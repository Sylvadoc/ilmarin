# Require any additional compass plugins here.

#General settings
encoding = "utf-8"

#Folder settings
relative_assets = true      #because we're not working from the root
css_dir = "css"          	#where the CSS will saved
sass_dir = "styles"         #where our .scss files are
images_dir = "../images"    #the folder with your images

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compressed # After dev :compressed # before dev :expanded

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false #true false

# Obviously
preferred_syntax = :scss

# Removes the BOM for UTF-8 stylesheets
on_stylesheet_saved do |filename|
  css     = File.open(filename, 'r')
  content = css.read
  if "UTF-8" == content.encoding.name
    content.sub!("\xEF\xBB\xBF".force_encoding("UTF-8"), '')
    File.write(filename, content)
  end
end