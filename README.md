# Covid-19 Vaccination Timeline Data Visualization

### Context:
* I am presenting a comparison on the relationship between vaccinations and deaths.

### User and Organisational Goals:
* User: To allow users to learn about the advantages of vaccination, and prompt them to register for vaccination.
* Organisation: To educate users who are hesitant about vaccination.

### Project URL
* https://eloquent-cori-638199.netlify.app/

### Why the Project Should Exist
* The project should exist to address vaccine hesitancy.

### UX/UI:
* User story: As a user, I am afraid to register for the Covid-19 vaccination due to claims of people dying after taking the vaccination. I want to garner more information about the actual statistics of deaths from the disease, since the time the vaccinations have been rolled out. I can search for different countries, and compare the number of vaccinations that have been administered, versus the historical count for the deaths from covid-19. If I can visually see that an increasing number of vaccinations results in a flattening of the death cases, I can make a more informed decision about whether or not to get myself vaccinated.
* Wireframes:
<div class='container-fluid'>
<img src='mockups/mockup_index.JPG' class='img-fluid'>
<img src='mockups/mockup_form.JPG' class='img-fluid'>
</div>
* Five planes of UI/UX: For the graphs, I decided to go with red for deaths as it is a colour that is often associated with warnings, and blue for the vaccinations because I want to user to associate vaccination with a feeling of calmness and not something to be afraid of. The button to visit the register page stands out, and it is a call to action to the user to click it. The colour of the entire index page is dark, because this is a matter to be taken seriously.

### Features
* User is able to search for specific country, and limit the day range. There is a zoom function on the graph, but the search will be more specific.
* The graphs display information that is obtained from APIs, therefore, there is sometimes a delay in actual cases for the day(s). There is sometimes also discrepencies in the reporting of the numbers for the various countries, so the information might not be accurate due to this.


Target audience:
1. Otter lovers
2. Nature lovers

We use the `<div class="container">` to create a Bootstrap container

Here is how we can include a responsive image in Bootstrap:

```
<img src='otters.jpg' class='img-fluid'>
```

