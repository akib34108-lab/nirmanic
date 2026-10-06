

function CreateProjects() {
    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost/nirmanic_api/projects/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/projects';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
    return (
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Create Project</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Project List</li>
              <li className="breadcrumb-item active" aria-current="page"><a href="#">Create Project </a></li>
            </ol>
          </nav>
        </div>
       <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <form className="form-sample" onSubmit={ handleSubmit }>
              <p className="card-description">Project info</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Client ID</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" placeholder="Client ID" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Location</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" placeholder="Project Location" />
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Type</label>
                    <div className="col-sm-9">
                        <select className="form-control">
                            <option value="">Select Project Type</option>
                            <option value="1">Residential</option>
                            <option value="2">Commercial</option>
                            <option value="3">Industrial</option>
                            <option value="4">Infrastructure</option>
                            <option value="5">Institutional</option>
                            <option value="6">Hospitality</option>
                            <option value="7">Government</option>
                            <option value="8">Renovation</option>
                            <option value="9">Other</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Budget</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" placeholder="Project Budget" />
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Progress</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" placeholder="Project Progress" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Status</label>
                    <div className="col-sm-9">
                        <select className="form-control">
                            <option value="">Select Project Status</option>
                            <option value="1">Planning</option>
                            <option value="2">Upcoming</option>
                            <option value="3">Active</option>
                            <option value="4">On Hold</option>
                            <option value="5">Delayed</option>
                            <option value="6">Completed</option>
                            <option value="7">Cancelled</option>
                        </select>
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Start Date</label>
                    <div className="col-sm-9">
                      <input type="date" className="form-control" placeholder="Start Date" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Completion Date</label>
                    <div className="col-sm-9">
                      <input type="date" className="form-control" placeholder="Completion Date" />
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                  <div className="form-group row">
                    <textarea className="form-control" rows="4" placeholder="Project Description"></textarea>
                  </div>
                </div>
            </div>
        </form>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
    </div>
</div>
</div>
</div>

    );
}
export default CreateProjects;