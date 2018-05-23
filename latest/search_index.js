var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#InteractBase-1",
    "page": "Introduction",
    "title": "InteractBase",
    "category": "section",
    "text": "InteractBase aims to be the successor of Interact and InteractNext.It allows to create small GUIs in Julia based on web technology. These GUIs can be deployed in jupyter notebooks, in the Juno IDE plot pane, in an Electron window or in the browser.To understand how to use it go through the Tutorial. The tutorial is also available here as a Jupyter notebook.A list of available widget can be found at API referenceInteractBase (together with Vue and WebIO) provides the logic that allows the communication between Julia and Javascript and the organization of the widgets. To style those widgets you will need to load one CSS framework."
},

{
    "location": "index.html#CSS-frameworks-1",
    "page": "Introduction",
    "title": "CSS frameworks",
    "category": "section",
    "text": "Two CSS frameworks are available, based one on Bulma and the other on UIkit. Choosing one or the other is mainly a matter of taste. To install the corresponding package type:Pkg.clone(\"https://github.com/piever/InteractBulma.jl\")\nPkg.build(\"InteractBulma\");orPkg.clone(\"https://github.com/piever/InteractUIkit.jl\")\nPkg.build(\"InteractUIkit\");in the REPL.To load one of them simply do, for example:using InteractBulmaTo change backend in the middle of the session simply do:settheme!(Bulma())orsettheme!(UIkit())"
},

{
    "location": "tutorial.html#",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "page",
    "text": "EditURL = \"https://github.com/piever/InteractBase.jl/blob/master/docs/src/tutorial.jl\""
},

{
    "location": "tutorial.html#Tutorial-1",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "section",
    "text": ""
},

{
    "location": "tutorial.html#Installing-everything-1",
    "page": "Tutorial",
    "title": "Installing everything",
    "category": "section",
    "text": "To install a backend of choice (for example InteractUIkit), simply typePkg.clone(\"https://github.com/piever/InteractBase.jl\")\nPkg.clone(\"https://github.com/piever/InteractUIkit.jl\")\nPkg.build(\"InteractUIkit\");in the REPL.The basic behavior is as follows: Interact provides a series of widgets, each widgets has a primary observable that can be obtained with observe(widget) and adding listeners to that observable one can provide behavior. Let\'s see this in practice."
},

{
    "location": "tutorial.html#Displaying-a-widget-1",
    "page": "Tutorial",
    "title": "Displaying a widget",
    "category": "section",
    "text": "using InteractUIkit, WebIO\nui = button()\ndisplay(ui)Note that display works in a Jupyter notebook or in Atom, whereas to open it as a standalone Electron window, one would do:using Blink\nw = Window()\nbody!(w, ui);and to serve it in the browserusing Mux\nwebio_serve(page(\"/\", req -> ui), rand(8000, 9000)) # serve on a random port"
},

{
    "location": "tutorial.html#Adding-behavior-1",
    "page": "Tutorial",
    "title": "Adding behavior",
    "category": "section",
    "text": "For now this button doesn\'t do anything. This can be changed by adding callbacks to its primary observable:o = observe(ui)Each observable holds a value and its value can be inspected with the [] syntax:o[]In the case of the button, the observable represents the number of times it has been clicked: click on it and check the value again.To add some behavior to the widget we can use the on construct. on takes two arguments, a function and an observable. As soon as the observable is changed, the function is called with the latest value.on(println, o)If you click again on the button you will see it printing the number of times it has been clicked so far.Tip: anonymous function are very useful in this programming paradigm. For example, if you want the button to say \"Hello!\" when pressed, you should use:on(n -> println(\"Hello!\"), o)Tip n. 2: using the [] syntax you can also set the value of the observable:o[] = 33To learn more about Observables, check out their documentation here."
},

{
    "location": "tutorial.html#What-widgets-are-there?-1",
    "page": "Tutorial",
    "title": "What widgets are there?",
    "category": "section",
    "text": "Once you have grasped this paradigm, you can play with any of the many widgets available:filepicker() # observable is the path of selected file\ntextbox(\"Write here\") # observable is the text typed in by the user\nautocomplete([\"Mary\", \"Jane\", \"Jack\"]) # as above, but you can autocomplete words\ncheckbox(label = \"Check me!\") # observable is a boolean describing whether it\'s ticked\ntoggle(label = \"I have read and agreed\") # same as a checkbox but styled differently\nslider(1:100, label = \"To what extent?\", value = 33) # Observable is the number selectedAs well as the option widgets, that allow to choose among options:dropdown([\"a\", \"b\", \"c\"]) # Observable is option selected\ntogglebuttons([\"a\", \"b\", \"c\"]) # Observable is option selected\nradiobuttons([\"a\", \"b\", \"c\"]) # Observable is option selectedThe option widgets can also take as input a dictionary (ordered dictionary is preferrable, to avoid items getting scrambled), in which case the label displays the key while the observable stores the value:using DataStructures\ns = dropdown(OrderedDict(\"a\" => \"Value 1\", \"b\" => \"Value 2\"))\ndisplay(s)observe(s)[]"
},

{
    "location": "tutorial.html#A-simpler-approach-for-simpler-cases-1",
    "page": "Tutorial",
    "title": "A simpler approach for simpler cases",
    "category": "section",
    "text": "While the approach sketched above works for all sorts of situations, there is a specific marcro to simplify it in some specific case. If you want to update some result (maybe a plot) as a function of some parameters (discrete or continuous) simply write @manipulate before the for loop. Discrete parameters will be replaced by togglebuttons and continuous parameters by slider: the result will be updated as soon as you click on a button or move the slider:width, height = 700, 300\ncolors = [\"black\", \"gray\", \"silver\", \"maroon\", \"red\", \"olive\", \"yellow\", \"green\", \"lime\", \"teal\", \"aqua\", \"navy\", \"blue\", \"purple\", \"fuchsia\"]\ncolor(i) = colors[i%length(colors)+1]\nui = @manipulate for nsamples in 1:200,\n        sample_step in slider(0.01:0.01:1.0, value=0.1, label=\"sample step\"),\n        phase in slider(0:0.1:2pi, value=0.0, label=\"phase\"),\n        radii in 0.1:0.1:60\n    cxs_unscaled = [i*sample_step + phase for i in 1:nsamples]\n    cys = sin.(cxs_unscaled) .* height/3 .+ height/2\n    cxs = cxs_unscaled .* width/4pi\n    dom\"svg:svg[width=$width, height=$height]\"(\n        (dom\"svg:circle[cx=$(cxs[i]), cy=$(cys[i]), r=$radii, fill=$(color(i))]\"()\n            for i in 1:nsamples)...\n    )\nendor, if you want a plot with some variables taking discrete values:using Plots, DataStructures\n\nx = y = 0:0.1:30\n\nfreqs = OrderedDict(zip([\"pi/4\", \"π/2\", \"3π/4\", \"π\"], [π/4, π/2, 3π/4, π]))\n\nmp = @manipulate for freq1 in freqs, freq2 in slider(0.01:0.1:4π; label=\"freq2\")\n    y = @. sin(freq1*x) * sin(freq2*x)\n    plot(x, y)\nend"
},

{
    "location": "tutorial.html#Layout-1",
    "page": "Tutorial",
    "title": "Layout",
    "category": "section",
    "text": "To create a full blown web-app, you should learn the layout tools that the CSS framework you are using provides. Both Bulma and UIkit have modern layout tools for responsive design (of course, use Bulma if you\'re working with InteractBulma and UIkit if you\'re working with InteractUIkit). You can use WebIO to create from Julia the HTML required to create these layouts.However, this can be overwhelming at first (especially for users with no prior experience in web design). A simpler solution is CSSUtil, a package that provides some tools to create simple layouts.using CSSUtil\nloadbutton = filepicker()\nhellobutton = button(\"Hello!\")\ngoodbyebutton = button(\"Good bye!\")\nui = vbox( # put things one on top of the other\n    loadbutton,\n    hbox( # put things one next to the other\n        pad(1em, hellobutton), # to allow some white space around the widget\n        pad(1em, goodbyebutton),\n    )\n)\ndisplay(ui)This page was generated using Literate.jl."
},

{
    "location": "api_reference.html#",
    "page": "API reference",
    "title": "API reference",
    "category": "page",
    "text": ""
},

{
    "location": "api_reference.html#API-reference-1",
    "page": "API reference",
    "title": "API reference",
    "category": "section",
    "text": ""
},

{
    "location": "api_reference.html#InteractBase.input",
    "page": "API reference",
    "title": "InteractBase.input",
    "category": "function",
    "text": "input(o; typ=\"text\")\n\nCreate an HTML5 input element of type type (e.g. \"text\", \"color\", \"number\", \"date\") with o as initial value.\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.button",
    "page": "API reference",
    "title": "InteractBase.button",
    "category": "function",
    "text": "button(content=\"\"; clicks::Observable)\n\nA button. content goes inside the button. Note the button content supports a special clicks variable, e.g.: button(\"clicked {{clicks}} times\")\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.filepicker",
    "page": "API reference",
    "title": "InteractBase.filepicker",
    "category": "function",
    "text": "filepicker(label=\"\"; placeholder=\"\", multiple=false, accept=\"*\")\n\nCreate a widget to select files. If multiple=true the observable will hold an array containing the paths of all selected files. Use accept to only accept some formats, e.g. accept=\".csv\"\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.textbox",
    "page": "API reference",
    "title": "InteractBase.textbox",
    "category": "function",
    "text": "textbox(label=\"\"; text::Union{String, Observable})\n\nCreate a text input area with an optional label e.g. textbox(\"enter number:\")\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.autocomplete",
    "page": "API reference",
    "title": "InteractBase.autocomplete",
    "category": "function",
    "text": "autocomplete(options, o=\"\"; multiple=false, accept=\"*\")\n\nCreate a textbox input with autocomplete options specified by options and with o as initial value.\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.checkbox",
    "page": "API reference",
    "title": "InteractBase.checkbox",
    "category": "function",
    "text": "checkbox(checked::Union{Bool, Observable}=false; label)\n\nA checkbox. e.g. checkbox(label=\"be my friend?\")\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.toggle",
    "page": "API reference",
    "title": "InteractBase.toggle",
    "category": "function",
    "text": "toggle(checked::Union{Bool, Observable}=false; label)\n\nA toggle switch. e.g. toggle(label=\"be my friend?\")\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.slider",
    "page": "API reference",
    "title": "InteractBase.slider",
    "category": "function",
    "text": "function slider(vals; # Range\n                value=medianelement(valse),\n                label=\"\", kwargs...)\n\nCreates a slider widget which can take on the values in vals, and updates observable value when the slider is changed:\n\n\n\n"
},

{
    "location": "api_reference.html#Input-widgets-1",
    "page": "API reference",
    "title": "Input widgets",
    "category": "section",
    "text": "InteractBase.input\nbutton\nfilepicker\ntextbox\nautocomplete\ncheckbox\ntoggle\nslider"
},

{
    "location": "api_reference.html#InteractBase.dropdown",
    "page": "API reference",
    "title": "InteractBase.dropdown",
    "category": "function",
    "text": "dropdown(options::Associative;\n         value = first(values(options)),\n         label = nothing,\n         multiple = false)\n\nA dropdown menu whose item labels will be the keys of options. If multiple=true the observable will hold an array containing the values of all selected items e.g. dropdown(OrderedDict(\"good\"=>1, \"better\"=>2, \"amazing\"=>9001))\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.togglebuttons",
    "page": "API reference",
    "title": "InteractBase.togglebuttons",
    "category": "function",
    "text": "togglebuttons(options::Associative; selected::Union{T, Observable})\n\nCreates a set of toggle buttons whose labels will be the keys of options.\n\n\n\n"
},

{
    "location": "api_reference.html#InteractBase.radiobuttons",
    "page": "API reference",
    "title": "InteractBase.radiobuttons",
    "category": "function",
    "text": "radiobuttons(options::Associative;\n             value::Union{T, Observable} = first(values(options)))\n\ne.g. radiobuttons(OrderedDict(\"good\"=>1, \"better\"=>2, \"amazing\"=>9001))\n\n\n\n"
},

{
    "location": "api_reference.html#Option-widgets-1",
    "page": "API reference",
    "title": "Option widgets",
    "category": "section",
    "text": "dropdown\ntogglebuttons\nradiobuttons"
},

]}
