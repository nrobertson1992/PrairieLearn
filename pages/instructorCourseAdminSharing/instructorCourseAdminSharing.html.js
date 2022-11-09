const { html } = require('@prairielearn/html');
const { renderEjs } = require('@prairielearn/html-ejs');

const addSharingSetPopover = (resLocals) => {
  return html`
    <form name="sharing-set-create" method="POST">
      <input type="hidden" name="__action" value="sharing_set_create">
      <input type="hidden" name="__csrf_token" value="${resLocals.__csrf_token}">

      <div class="form-group mb-4">
        <p class=form-text>
          Enter the name of the sharing set you would like to create.
        </p>
      </div>
      <div class=form-group>
        <input class="form-control form-control-sm" type="text" name="sharing_set_name" required/>
      <div>
      <div class="text-right mt-4">
        <button type="button" class="btn btn-secondary" onclick="$('#courseSharingSetAdd').popover('hide')">Cancel</button>
        <button type="submit" class="btn btn-primary">Create Sharing Set</button>
      </div>
    </form>
  `.toString();
}

// const generateSharingSetRow = () => {

// }

const InstructorSharing =  ({
  sharing_name,
  sharing_id,
  sharing_sets,
  resLocals,
}) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${renderEjs(__filename, "<%- include('../../pages/partials/head') %>", resLocals)}
        <style>
          .continue-card-container {
            width: 100%;
            max-width: 400px;
          }
        </style>
      </head>
      <body>
        <script>
            $(function() {
                $('[data-toggle="popover"]').popover({
                  sanitize: false
                })
            });
        </script>
        ${renderEjs(__filename, "<%- include('../partials/navbar'); %>", resLocals)}
        <div id="content" class="container-fluid">
          <div class="card mb-4">
            <div class="card-header bg-primary text-white d-flex">
                Course Sharing Info
            </div>
            <table class="table table-sm table-hover two-column-description">
              <tbody>
                <tr><th>Sharing Name</th><td>@${sharing_name}</td></tr>
                <tr><th>Sharing ID</th>
                  <td>
                  ${sharing_id}
                  <button class="btn btn-xs btn-secondary mx-2" onclick="navigator.clipboard.writeText('${sharing_id}');">
                    <i class="fa fa-copy"></i>
                    <span>Copy</span>
                  </button>
                  <form name="sharing-id-regenerate" method="POST" class="d-inline">
                    <input type="hidden" name="__action" value="sharing_id_regenerate">
                    <input type="hidden" name="__csrf_token" value="${resLocals.__csrf_token}">
                    <button role="button" type="submit" class="btn btn-xs btn-secondary mx-2">
                      <i class="fa fa-rotate"></i>
                      <span>Regenerate</span>
                    </button>
                  </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card mb-4">
          <div class="card-header bg-primary">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto">
                <span class="text-white">Sharing Sets</span>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-light btn-sm ml-auto" id="courseSharingSetAdd" tabindex="0"
                  data-toggle="popover" data-container="body" data-html="true" data-placement="auto" title="Create Sharing Set"
                  data-content="${addSharingSetPopover(resLocals)}"
                  data-trigger="manual" onclick="$(this).popover('show')"
                >
                  <i class="fas fa-plus" aria-hidden="true"></i>
                  <span class="d-none d-sm-inline">Create Sharing Set</span>
                </button>
              </div>
            </div>
          </div>
          <table class="table table-sm table-hover table-striped">
            <thead>
              <th>Sharing Set Name</th>
              <th>Shared With</th>
            </thead>
            <tbody>
              ${sharing_sets.map(sharing_set => html`
                <tr><td>${sharing_set.name}</td>
                <td class="middle-align">${sharing_set.shared_with.map(course_shared_with => html`
                  <form name="sharing-set-access-change-${sharing_set.id}-${course_shared_with.course_id}" method="POST" class="d-inline">
                    <input type="hidden" name="__action" value="course_instance_permissions_update_role_or_delete">
                    <input type="hidden" name="__csrf_token" value="${resLocals.__csrf_token}">
                    <input type="hidden" name="course_id" value="${course_shared_with.course_id}">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Button group with nested dropdown">
                      <!-- TODO we don't actually want the main part to be a button! -->
                      <div class="btn-group btn-group-sm" role="group">
                        <div class="btn btn-sm btn-outline-primary">
                          ${course_shared_with.short_name}
                        </div>
                      </div>
                      <button type="submit" class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-times"></i>
                      </button>
                    </div>
                  </form>
                `)}
                  <form name="sharing-set-access-add-${sharing_set.id}" method="POST" class="d-inline">
                    <input type="hidden" name="__action" value="course_instance_permissions_insert">
                    <input type="hidden" name="__csrf_token" value="${resLocals.__csrf_token}">
                    <div class="btn-group btn-group-sm" role="group">
                      <button id="addSSPDrop-${sharing_set.id}" type="button" class="btn btn-sm btn-outline-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add...
                      </button>
                      <div class="dropdown-menu" aria-labelledby="addSSPDrop-${sharing_set.id}">
                        <div class="dropdown-header text-wrap">
                          <p>
                            To allow another course to access questions in the sharing set "${sharing_set.name}", enter their course sharing id below.
                          </p>
                        </div>
                        <div class="" style="padding:1em;">
                          <input class="form-control form-control-sm" type="text" name="course_sharing_id" required/>
                          <button class="btn-sm btn-primary" type="Submit">Add Course</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </td></tr>
              `)}
            </tbody>
        </div>
      </body>
    </html>
  `.toString();

}

module.exports.InstructorSharing = InstructorSharing;