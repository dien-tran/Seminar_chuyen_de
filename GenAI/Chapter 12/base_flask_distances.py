from flask import Flask, request, jsonify
import numpy as np


app = Flask(__name__)


@app.route("/distances", methods=["POST"])
def calculate_distance():
    """
    Calculate the distance between two matrices based on the specified distance type.

    This function handles HTTP requests to compute either L1 (Manhattan) or L2 (Euclidean) 
    distance between two input matrices.

    Expected JSON request format:
    {
        "distance": str,  # Either "L1" or "L2"
        "df1": list,      # First matrix
        "df2": list       # Second matrix
    }

    Returns:
        Response: A JSON response containing either:
            - {"distance": float} - The calculated distance value
            - {"error": str} - An error message if validation fails

    Raises:
        ValueError: Implicitly handled via error responses when:
            - Input matrices have different shapes
            - Distance type is not "L1" or "L2"

    Notes:
        - L1 distance: Sum of absolute differences (Manhattan distance)
        - L2 distance: Square root of sum of squared differences (Euclidean distance)
        - Both matrices must have identical shapes for calculation
    """
    data = request.get_json()
    dist_type = data.get("distance")
    if dist_type == "L1":
        a = data.get("df1")
        b = data.get("df2")
        if np.asarray(a).shape != np.asarray(b).shape:
            return jsonify({"error": "Matrices must have the same shape"})
        dist = np.sum(np.abs(a - b))
        return jsonify({"distance": dist})
    elif dist_type == "L2":
        a = data.get("df1")
        b = data.get("df2")
        if np.asarray(a).shape != np.asarray(b).shape:
            return jsonify({"error": "Matrices must have the same shape"})
        dist = 0
        for i in range(len(a)):
            for j in range(len(a[i])):
                dist += (a[i][j] - b[i][j]) ** 2
        dist = np.sqrt(dist)
        return jsonify({"distance": dist})
    else:
        return jsonify({"error": "Invalid distance type"})