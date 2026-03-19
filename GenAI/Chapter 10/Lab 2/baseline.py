def get_euclidean_dist(a, b):
    print("Info: computing L2 distance...")
    dist_2 = 0
    for i in range(len(a)):
        for j in range(len(a[i])):
            dist_2 += (a[i][j] - b[i][j]) ** 2
    return np.sqrt(dist_2)
