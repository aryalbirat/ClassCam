from deep_sort_realtime.deepsort_tracker import DeepSort

def initialize_tracker():
    return DeepSort(max_age=30)