import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function SwaggerViewer() {
  return (
    <div>
      <SwaggerUI
        url="http://localhost:3000/swagger.json" // Replace with your Swagger/OpenAPI specification URL
        docExpansion="list" // Set the documentation expansion to 'list' for better readability
      />
    </div>
  );
}

export default SwaggerViewer;
