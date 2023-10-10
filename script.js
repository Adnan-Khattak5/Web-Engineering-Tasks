  $(document).ready(function() {
    var container = $(".second");
    var data;

    function displayJobDetails(item) {
      // Create POP UP Element
      var popup = $("<div>").addClass("popup");
      var closeBtn = $("<span>").addClass("close-btn").html("&times;");
      closeBtn.click(function() {
        popup.remove();
      });

      var logo = $("<img>").attr("src", item.logo).addClass("logo");
      var company = $("<div>").addClass("company").text(item.company);
      var position = $("<div>").addClass("position").text(item.position);
      var postedAt = $("<div>").addClass("postedAt").text(item.postedAt);
      var contract = $("<div>").addClass("contract").text(item.contract);
      var location = $("<div>").addClass("location").text(item.location);
      var role = $("<div>").addClass("role").text(item.role);
      var level = $("<div>").addClass("level").text(item.level);
      var languages = $("<div>").addClass("languages");
      var tools = $("<div>").addClass("tools");

      // Append languages to the languages div
      for (var j = 0; j < item.languages.length; j++) {
        var language = item.languages[j];
        var languageParagraph = $("<p>").text(language);
        languages.append(languageParagraph);
      }

      // Append tools to the tools div
      for (var j = 0; j < item.tools.length; j++) {
        var tool = item.tools[j];
        var toolsItem = $("<p>").text(tool);
        tools.append(toolsItem);
      }

      // Append elements to the popup
      popup.append(closeBtn, logo, company, position, postedAt, contract, location, role, level, languages, tools);

      // Add the popup to the container
      container.append(popup);
    }

    $.getJSON("data.json", function(response) {
      data = response;
      // Display the data
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var card = $("<div>").addClass("card");
        var logo = $("<img>").attr("src", item.logo).addClass("logo");
        var companyDetails = $("<div>").addClass("company-details");
        var company = $("<div>").addClass("company").text(item.company);
        var details = $("<div>").addClass("details");
        var position = $("<div>").addClass("position").text(item.position);
        var info = $("<div>").addClass("info");
        var postedAt = $("<span>").addClass("postedAt").text(item.postedAt);
        var contract = $("<span>").addClass("contract").text(item.contract);
        var location = $("<span>").addClass("location").text(item.location);
        var role = $("<span>").addClass("role").text(item.role);
        var level = $("<span>").addClass("level").text(item.level);
        var languages = $("<div>").addClass("languages");
        var tools = $("<div>").addClass("tools").text(item.tools.join(", "));

        // Append elements to the card
        details.append(position);
        info.append(postedAt, contract, location);
        details.append(info);
        companyDetails.append(company, details);

        // Create paragraph tags for role and level
        var roleParagraph = $("<p>").text(role.text());
        var levelParagraph = $("<p>").text(level.text());
        languages.append(roleParagraph, levelParagraph);

        for (var j = 0; j < item.languages.length; j++) {
          var language = item.languages[j];
          var languageParagraph = $("<p>").text(language);
          languages.append(languageParagraph);
        }

        for (var j = 0; j < item.tools.length; j++) {
          var tool = item.tools[j];
          var toolsitem = $("<p>").text(tool);
          tools.append(toolsitem);
        }

        // Create the delete button
        var deleteButton = $("<button>").addClass("delete-button").text("Delete");
        deleteButton.click(function() {
          $(this).closest(".card").remove();
        });

        // Create a container for the delete button
        var deleteButtonContainer = $("<div>").addClass("delete-button-container");
        deleteButtonContainer.append(deleteButton);

        // Associate data with the card element
        card.data("item", item);

        card.append(logo, companyDetails, languages, deleteButton);
        card.show();
        container.append(card);
      }
    }).fail(function(err) {
      console.log(err);
    });

    function handleSearch() {
      var searchValue = $(".search input[type='text']").val().toLowerCase();

      $(".card").each(function() {
        var card = $(this);
        var languages = card.find(".languages");
        var languagesText = languages.text().toLowerCase();
          if (languagesText.indexOf(searchValue) !== -1) {
            card.show();
          } else {
            card.hide();
          }
        });
        }
        
        $(".search input[type='text']").on("input", handleSearch);
        
        // Add click event listener to card
        container.on("click", ".card", function() {
        // Retrieve the associated data for the clicked card
        var item = $(this).data("item");
        // Display job details in a popup
        displayJobDetails(item);
        });
        
        // Add click event listener to Add button
        var addButton = $("<button>").addClass("add-button").text("Add");
        $("body").append(addButton);
        
        var popupContainer = $("<div>").addClass("popup-container");
        // $("body").append(popupContainer);
        
    addButton.click(function() {
      var popup = $("<div>").addClass("popup");
      var closeBtn = $("<span>").addClass("close-btn").html("×");


      var form = $("<form>").addClass("job-form");
      var companyInput = $("<input>").attr("type", "text").attr("placeholder", "Company").addClass("input-field");
      var positionInput = $("<input>").attr("type", "text").attr("placeholder", "Position").addClass("input-field");
      var postedAtInput = $("<input>").attr("type", "text").attr("placeholder", "Posted At").addClass("input-field");
      var contractInput = $("<input>").attr("type", "text").attr("placeholder", "Contract").addClass("input-field");
      var locationInput = $("<input>").attr("type", "text").attr("placeholder", "Location").addClass("input-field");
      var roleInput = $("<input>").attr("type", "text").attr("placeholder", "Role").addClass("input-field");
      var levelInput = $("<input>").attr("type", "text").attr("placeholder", "Level").addClass("input-field");
      var languagesInput = $("<input>").attr("type", "text").attr("placeholder", "Languages (comma-separated)").addClass("input-field");
      var toolsInput = $("<input>").attr("type", "text").attr("placeholder", "Tools (comma-separated)").addClass("input-field");
      var imageInput = $("<input>").attr("type", "file").attr("accept", "image/*").addClass("input-field"); // Image upload input
      var submitButton = $("<button>").attr("type", "button").addClass("submit-button").text("Submit");
      
form.append(companyInput, positionInput, postedAtInput, contractInput, locationInput, roleInput, levelInput, languagesInput, toolsInput, imageInput, submitButton);
  popup.append(closeBtn, form);
    popupContainer.append(popup);

      closeBtn.click(function() {
      popup.remove();
      });
  submitButton.click(function() {
    // Get the input values
    var company = companyInput.val();
    var position = positionInput.val();
    var postedAt = postedAtInput.val();
    var contract = contractInput.val();
    var location = locationInput.val();
    var role = roleInput.val();
    var level = levelInput.val();
    var logo = imageInput;
    var languages = languagesInput.val().split(",");
    var tools = toolsInput.val().split(",");

    // Perform necessary validations
    if (company && position && postedAt && contract && location && role && level && languages.length > 0 && tools.length > 0) {
      // Create a new job object
      var newJob = {
        company: company,
        position: position,
        postedAt: postedAt,
        contract: contract,
        location: location,
        role: role,
        level: level,
        languages: languages,
        tools: tools,
        logo: logo
      };

      // Add the new job to the existing list of jobs (in memory)
      data.push(newJob);

      // Close the popup
      popup.remove();

      // Display the new job card
      var card = $("<div>").addClass("card");
      var logo = $("<img>").attr("src", "").addClass("logo");
      var companyDetails = $("<div>").addClass("company-details");
      var company = $("<div>").addClass("company").text(newJob.company);
      var details = $("<div>").addClass("details");
      var position = $("<div>").addClass("position").text(newJob.position);
      var info = $("<div>").addClass("info");
      var postedAt = $("<span>").addClass("postedAt").text(newJob.postedAt);
      var contract = $("<span>").addClass("contract").text(newJob.contract);
      var location = $("<span>").addClass("location").text(newJob.location);
      var role = $("<span>").addClass("role").text(newJob.role);
      var level = $("<span>").addClass("level").text(newJob.level);
      var languages = $("<div>").addClass("languages");
      var tools = $("<div>").addClass("tools").text(newJob.tools.join(", "));

      // Append elements to the card
      details.append(position);
      info.append(postedAt, contract, location);
      details.append(info);
      companyDetails.append(company, details);

      // Create paragraph tags for role and level
      var roleParagraph = $("<p>").text(role.text());
      var levelParagraph = $("<p>").text(level.text());
      languages.append(roleParagraph, levelParagraph);

      for (var j = 0; j < newJob.languages.length; j++) {
        var language = newJob.languages[j];
        var languageParagraph = $("<p>").text(language);
        languages.append(languageParagraph);
      }

      for (var j = 0; j < newJob.tools.length; j++) {
        var tool = newJob.tools[j];
        var toolsItem = $("<p>").text(tool);
        tools.append(toolsItem);
      }

      // Create the delete button
      var deleteButton = $("<button>").addClass("delete-button").text("Delete");
      deleteButton.click(function() {
        $(this).closest(".card").remove();
      });

      // Create a container for the delete button
      var deleteButtonContainer = $("<div>").addClass("delete-button-container");
      deleteButtonContainer.append(deleteButton);

      // Associate data with the card element
      card.data("item", newJob);

      card.append(logo, companyDetails, languages, deleteButton);
      card.show();
      container.append(card);
    } else {
      alert("Please fill in all the required fields.");
    }
  });

  form.append(
    companyInput,
    positionInput,
    postedAtInput,
    contractInput,
    locationInput,
    roleInput,
    levelInput,
    languagesInput,
    toolsInput,
    submitButton
  );

  popup.append(closeBtn, form);
  container.append(popup);

  });

  });